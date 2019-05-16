import React from 'react'

import './style/userReceita.scss'

const UserReceita = props => {
  const { receita } = props
  let nome = receita.nome
  if (nome.length > 18) {
    nome = nome.slice(0, 18)
  }

  return (
    <div className="d-flex user-receita p-2 m-2">
      <div className="title">
        <p className="receita-title">{nome}</p>
      </div>
      <div className="rate">
        <p>4,5</p>
      </div>
    </div>
  )
}

export default UserReceita
