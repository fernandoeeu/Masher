import React, { useState, useContext } from 'react'

import './style/main.scss'

import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";

const Ingrediente = observer(({ ingrediente }) => {

    const uiStore = useContext(UiStoreContext);



    const toggleCIng = ingrediente => {
        uiStore.removeIngredientes(ingrediente)
    }

    return (
        <div className="ingrediente mx-2">
            <p className="p-3">{ingrediente} <span onClick={() => toggleCIng(ingrediente)} className="remover">╳</span></p>
        </div>
    )
})

export default Ingrediente
