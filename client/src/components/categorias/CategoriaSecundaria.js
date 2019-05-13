import React, { useState, useContext } from 'react'
import './style/main.scss'

import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";

const Categoria = observer(({ categoria }) => {
    const [isAdd, setIsAdd] = useState(false)

    const uiStore = useContext(UiStoreContext);
    const { nome } = categoria


    const toggleCat = nome => {
        if (!isAdd) {
            uiStore.addCategoriaSecundaria(nome)
            setIsAdd(true)
        } else {
            uiStore.removeCategoriaSecundaria(nome)
            setIsAdd(false)
        }

    }
    return (
        <div className={"categoria-secundaria m-2" + (uiStore.categoriaSecundaria.includes(nome) ? ' categoria-secundaria-active' : '')} onClick={() => toggleCat(nome)}>
            <p className="px-2 py-auto">{nome}</p>
        </div>
    )
})

export default Categoria
