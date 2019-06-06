import React, { useState, useContext, useEffect } from 'react'
import './style/main.scss'

import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";

const Categoria = observer(({ categoria }) => {
    const [isAdd, setIsAdd] = useState(false)
    const uiStore = useContext(UiStoreContext);

    const handleClick = () => {
        uiStore.changeCatSecUser(categoria)
        setIsAdd(!isAdd)
    }
    return (
        uiStore.checkIfCatPaiIsActive(categoria) ?
            <div onClick={() => uiStore.changeCategoriaSecundaria(categoria)} className={"categoria-secundaria m-2" + (uiStore.checkIfAddCategoriaSecundaria(categoria.id) ? ' categoria-secundaria-active' : '')}>
                <div className="categoria-secundaria-filho">
                    <p className="px-2 py-auto">{categoria.nome}</p>
                </div>
            </div> :
            null
    )
})

export default Categoria


// + (uiStore.catSecUser.includes(categoria) } onClick={() => handleClick()}