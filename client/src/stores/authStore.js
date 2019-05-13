import {
    configure,
    action,
    observable,
    runInAction,
    flow,
    decorate
  } from "mobx";
  import { createContext } from "react";
  
  class AuthStore {
    isActive;
  
    toggleIsActive = item => {
      this.sideMenuActiveItem = item;
    };
  }
  
  decorate(AuthStore, {
    isActive: observable,
    toggleIsActive: action,
  });
  
  const singleton = new AuthStore();
  
  export const AuthStoreContext = createContext(singleton);
  