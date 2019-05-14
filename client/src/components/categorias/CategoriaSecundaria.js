import React, { useState, useContext } from 'react'
import './style/main.scss'

import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";

const Categoria = observer(({ categoria }) => {
    const [isAdd, setIsAdd] = useState(false)

    const uiStore = useContext(UiStoreContext);
    const { nome } = categoria


    const toggleCat = nome => {
        if (uiStore.categoriaPrincipal.includes(categoria.pai) || (!uiStore.categoriaSecundaria.includes(nome))) {
            uiStore.addCategoriaSecundaria(nome)
            console.log('o pai ta la')
            // setIsAdd(false)
        } else {
            uiStore.removeCategoriaSecundaria(nome)
            // setIsAdd(true)
            console.log('tem')
        }
    }
    return (
        <div className={"categoria-secundaria m-2" + (uiStore.categoriaSecundaria.includes(nome) ? ' categoria-secundaria-active' : '')} onClick={() => uiStore.changeCategoriaSecundaria(categoria)}>
            <p className="px-2 py-auto">{nome}</p>
        </div>
    )
})

export default Categoria
