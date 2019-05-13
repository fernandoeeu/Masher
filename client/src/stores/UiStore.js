import {
  configure,
  action,
  observable,
  runInAction,
  flow,
  decorate
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
  removeCategoriaSecundaria = nome => {
    this.categoriaSecundaria.splice(this.categoriaSecundaria.findIndex(e => e === nome), 1)

  }
  addIngredientes = ing => {
    this.ingredientes.push(ing)
    console.log(this.ingredientes)

  }
  removeIngredientes = nome => {
    this.ingredientes.splice(this.ingredientes.findIndex(e => e === nome), 1)
    console.log(this.ingredientes)
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
  removeIngredientes: action
});

const singleton = new UiStore();

export const UiStoreContext = createContext(singleton);
