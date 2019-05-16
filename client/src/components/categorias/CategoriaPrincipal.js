import React, { useState, useContext } from 'react'
import './style/categoriaPrincipal.scss'

import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";

const Categoria = observer(({ categoria }) => {

  const uiStore = useContext(UiStoreContext);
  const { nome } = categoria


  const toggleCat = () => {
    uiStore.changeCategoriaPrincipal(categoria)
  }
  return (
    <div className={"categoria-principal d-flex m-2" + (uiStore.checkIfAddCategoriaPrincipal(categoria) > 0 ? ' categoria-principal-active' : '')} onClick={() => toggleCat()}>
      <p className="">{nome}</p>
    </div>
  )
})

export default Categoria
