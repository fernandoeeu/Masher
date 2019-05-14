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
        <div className="ingrediente mx-2" onClick={() => toggleCIng(ingrediente)}>
            <p className="p-3">{ingrediente.nome}</p>
        </div>
    )
})

export default Ingrediente
