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

import { categoriasPrincipais } from '../components/categorias/categoriasData'

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
  changeCategoriaPrincipal = id => {
    if (this.checkIfAddCategoriaPrincipal(id)) {
      this.removeCategoriaPrincipal(id)
    } else {
      this.addCategoriaPrincipal(id)
    }
  }

  addCategoriaPrincipal = id => {
    let aux = {}
    categoriasPrincipais.some(cat => {
      if (cat.id === id) {
        aux = cat
      }
    })
    this.categoriaPrincipal.push(aux)
  }
  removeCategoriaPrincipal = id => {
    this.categoriaPrincipal = this.categoriaPrincipal.filter(cp => cp.id !== id)
  }

  changeCategoriaSecundaria = categoria => {
    // if (!this.checkIfAddCategoriaSecundaria && this.checkIfAddCategoriaPrincipal(categoria.pai)) {
    //   this.addCategoriaSecundaria(categoria)
    // } else {
    //   console.log('deveria remover')
    //   this.removeCategoriaSecundaria(categoria.nome)
    // }
    if (!this.checkIfAddCategoriaSecundaria(categoria.id)) {
      this.addCategoriaSecundaria(categoria)
    } else {
      this.removeCategoriaSecundaria(categoria.id)
    }
  }

  addCategoriaSecundaria = categoria => {
    this.categoriaSecundaria.push(categoria)
  }

  removeCategoriaSecundaria = id => {
    this.categoriaSecundaria = this.categoriaSecundaria.filter(cp => cp.id !== id)
  }

  replaceCategoriaSeundaria = newArr => this.categoriaSecundaria = newArr
  replaceCategoriaPrincipal = newArr => this.categoriaPrincipal = newArr

  checkIfCatPaiIsActive = filha => {
    if (this.categoriaPrincipal.some(cat => cat.id === filha.pai)) {
      return true
    } else {
      if (this.categoriaSecundaria.some(cat => cat.id === filha.id)) {
        this.removeCategoriaSecundaria(filha.id)
      }
      return false
    }
  }

  checkIfAddCategoriaPrincipal = id => {
    if (this.categoriaPrincipal.some(c => c.id === id)) {
      return true
    } else {
      return false
    }
  }
  checkIfAddCategoriaSecundaria = id => {
    if (this.categoriaSecundaria.some(c => c.id === id)) {
      return true
    } else {
      return false
    }
  }

  replaceIngredientes = ing => {
    this.ingredientes = ing
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
