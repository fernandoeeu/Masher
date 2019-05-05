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

  changeSideMenuActiveItem = item => {
    this.sideMenuActiveItem = item;
  };
  changeConteudoAtual = nome => {
    this.conteudoAtual = nome;
  };
}

decorate(UiStore, {
  sideMenuActiveItem: observable,
  conteudoAtual: observable,
  changeSideMenuActiveItem: action,
  changeConteudoAtual: action
});

const singleton = new UiStore();

export const UiStoreContext = createContext(singleton);
