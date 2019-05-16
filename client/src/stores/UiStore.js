import {
  configure,
  action,
  observable,
  runInAction,
  flow,
  decorate,
  toJS
} from "mobx";
import { createContext } from "react";

class UiStore {
  sideMenuActiveItem = "Início";
  conteudoAtual = "Em Destaque";
  categoriaPrincipal = []
  // armazena as categorias secundarias com base nas categorias pai que estão ativas no momento
  categoriaSecundaria = []
  // armazena as categorias secundarias que o usuario clicou, se o usuario desmarcar uma categoria pai entao as filhas desse
  // pai devem ser removidas desse array
  catSecUser = []
  ingredientes = []

  changeSideMenuActiveItem = item => {
    this.sideMenuActiveItem = item;
  };
  changeConteudoAtual = nome => {
    this.conteudoAtual = nome;
  };
  changeCategoriaPrincipal = categoria => {
    if (this.checkIfAddCategoriaPrincipal(categoria) == 0) {
      this.addCategoriaPrincipal(categoria)
      categoria.sub.map(cat => this.addCategoriaSecundaria(cat))
    } else {
      this.removeCategoriaPrincipal(categoria)
      categoria.sub.map(cat => this.removeCategoriaSecundaria(cat))
      categoria.sub.map(cat => {
        if (this.catSecUser.includes(cat)) {
          this.removeCatSecUser(cat)
        }
      })
    }
  }

  addCategoriaPrincipal = categoria => {
    this.categoriaPrincipal.push(categoria)
  }
  removeCategoriaPrincipal = categoria => {
    this.categoriaPrincipal = this.categoriaPrincipal.filter(cp => cp.nome !== categoria.nome)
  }

  changeCategoriaSecundaria = categoria => {
    if (!this.categoriaSecundaria.includes(categoria.nome) && this.categoriaPrincipal.includes(categoria.pai)) {
      this.addCategoriaSecundaria(categoria.nome)
    } else {
      this.removeCategoriaSecundaria(categoria.nome)
    }
  }

  addCategoriaSecundaria = categoria => {
    this.categoriaSecundaria.push(categoria)
  }

  removeCategoriaSecundaria = nome => {
    this.categoriaSecundaria.splice(this.categoriaSecundaria.findIndex(e => e === nome), 1)
  }

  addCatSecUser = categoria => {
    this.catSecUser.push(categoria)
  }
  removeCatSecUser = categoria => {
    this.catSecUser.splice(this.catSecUser.findIndex(e => e === categoria), 1)
  }
  changeCatSecUser = categoria => {
    if (this.catSecUser.includes(categoria)) {
      this.removeCatSecUser(categoria)
    } else {
      this.addCatSecUser(categoria)
    }
  }
  checkIfAddedCatSecUser = categoria => {

  }
  checkIfAddCategoriaPrincipal = (categoria) => {
    let aux = 0;
    if (this.categoriaPrincipal.length > 0) {
      this.categoriaPrincipal.map(cp => cp.id === categoria.id ? aux++ : null)
    }
    return aux
  }


  addIngredientes = ing => {
    this.ingredientes.push(ing)
  }
  removeIngredientes = ingrediente => {
    this.ingredientes.splice(this.ingredientes.findIndex(e => e === ingrediente), 1)
  }

  clearFields = () => {
    this.categoriaPrincipal = []
    this.categoriaSecundaria = []
    this.catSecUser = []
    this.ingredientes = []
  }
}

decorate(UiStore, {
  sideMenuActiveItem: observable,
  conteudoAtual: observable,
  categoriaPrincipal: observable,
  categoriaSecundaria: observable,
  ingredientes: observable,
  changeSideMenuActiveItem: action,
  changeConteudoAtual: action,
  addCategoriaPrincipal: action,
  removeCategoriaPrincipal: action,
  addCategoriaSecundaria: action,
  removeCategoriaSecundaria: action,
  addIngredientes: action,
  removeIngredientes: action,
  changeCategoriaSecundaria: action,
  clearFields: action
});

const singleton = new UiStore();

export const UiStoreContext = createContext(singleton);
