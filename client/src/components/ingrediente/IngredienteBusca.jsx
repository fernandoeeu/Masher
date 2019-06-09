import React from 'react'

const IngredienteBusca = ({ nome }) => {
    return (
        <div className="ingredienteBusca">
            <p>{nome} <span className="remover">╳</span></p>
        </div>
    )
}

export default IngredienteBusca
