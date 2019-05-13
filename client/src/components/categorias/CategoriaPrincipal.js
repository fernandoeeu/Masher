import React, { useState, useContext } from 'react'
import './style/categoriaPrincipal.scss'

import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";

const Categoria = observer(({ categoria }) => {
  const [isAdd, setIsAdd] = useState(false)

  const uiStore = useContext(UiStoreContext);
  const { nome } = categoria


  const toggleCat = nome => {
    if (!isAdd) {
      uiStore.addCategoriaPrincipal(nome)
      setIsAdd(true)
    } else {
      uiStore.removeCategoriaPrincipal(nome)
      setIsAdd(false)
    }

  }
  return (
    <div className={"categoria-principal d-flex m-2" + (uiStore.categoriaPrincipal.includes(nome) ? ' categoria-principal-active' : '')} onClick={() => toggleCat(nome)}>
      <p className="">{nome}</p>
    </div>
  )
})

export default Categoria
