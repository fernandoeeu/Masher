import React from 'react'
import './categoria.scss'

const Categoria = props => {
  const { nome } = props
  return (
    <div className="col px-2">
      <div className="categoria">

      </div>
      <p className="text-center descricao-cat my-2 font-weight-light">{nome}</p>
    </div>
  )
}

export default Categoria
