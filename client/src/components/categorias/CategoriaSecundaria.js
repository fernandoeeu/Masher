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
        <div className={"categoria-secundaria m-2" + (uiStore.catSecUser.includes(categoria) ? ' categoria-secundaria-active' : '')} onClick={() => handleClick()}>
            <p className="px-2 py-auto">{categoria}</p>
        </div>
    )
})

export default Categoria
