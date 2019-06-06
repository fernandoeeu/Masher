import React, { useState, useContext } from 'react'
import './style/categoriaPrincipal.scss'

import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";

const Categoria = observer(({ categoria }) => {

  const uiStore = useContext(UiStoreContext);
  const { nome } = categoria


  const toggleCat = () => {
    uiStore.changeCategoriaPrincipal(categoria.id)
  }
  return (
    <div className={"categoria-principal m-2" + (uiStore.checkIfAddCategoriaPrincipal(categoria.id) ? ' categoria-principal-active' : '')} onClick={() => toggleCat()}>
      <div className="categoria-principal-filho">
        <p className="">{nome}</p>
      </div>
    </div>
  )
})

export default Categoria
