import React from 'react'

import './style/userReceita.scss'

const UserReceita = props => {
  let nome;
  if (props.receita) {
    console.log(props)
    const { receita } = props

    nome = receita.nome
    if (nome.length > 18) {
      nome = nome.slice(0, 18)
    }

  }


  return (
    props.receita ?
      <div className="d-flex user-receita p-2 m-2">
        <div className="title">
          <p className="receita-title">{nome}</p>
        </div>
        <div className="rate">
          <p>4,5</p>
        </div>
      </div> :
      <div className="placeholder p-2 m-2"></div>
  )
}

export default UserReceita
