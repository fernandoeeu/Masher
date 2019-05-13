import React, { useState, useContext } from 'react'

import './style/main.scss'

import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";

const Ingrediente = observer(({ nome }) => {

    const uiStore = useContext(UiStoreContext);

    console.log(nome)

    const toggleCIng = nome => {
        const { ingredientes } = uiStore
        if (ingredientes.includes(nome)) {
            console.log(nome)
            uiStore.removeIngredientes(nome)
        } else {
            console.log('nnn')
        }

    }

    return (
        <div className="ingrediente mx-2" onClick={() => toggleCIng(nome)}>
            <p className="p-3">{nome}</p>
        </div>
    )
})

export default Ingrediente
