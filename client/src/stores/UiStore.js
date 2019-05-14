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
  categoriaSecundaria = []
  ingredientes = []

  changeSideMenuActiveItem = item => {
    this.sideMenuActiveItem = item;
  };
  changeConteudoAtual = nome => {
    this.conteudoAtual = nome;
  };
  addCategoriaPrincipal = categoria => {
    this.categoriaPrincipal.push(categoria)
  }
  removeCategoriaPrincipal = nome => {
    this.categoriaPrincipal.splice(this.categoriaPrincipal.findIndex(e => e === nome), 1)
  }
  addCategoriaSecundaria = categoria => {
    this.categoriaSecundaria.push(categoria)

  }

  changeCategoriaSecundaria = categoria => {
    console.log(categoria)
    if (!this.categoriaSecundaria.includes(categoria.nome) && this.categoriaPrincipal.includes(categoria.pai)) {
      this.addCategoriaSecundaria(categoria.nome)
    } else {
      this.removeCategoriaSecundaria(categoria.nome)
    }
  }

  removeCategoriaSecundaria = nome => {
    this.categoriaSecundaria.splice(this.categoriaSecundaria.findIndex(e => e === nome), 1)
  }
  addIngredientes = ing => {
    this.ingredientes.push(ing)
  }
  removeIngredientes = ingrediente => {
    this.ingredientes.splice(this.ingredientes.findIndex(e => e === ingrediente), 1)
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
  changeCategoriaSecundaria: action
});

const singleton = new UiStore();

export const UiStoreContext = createContext(singleton);
