import React from 'react'
import { NavLink } from "react-router-dom";
import './userOpcao.scss'

const UserOpcao = props => {
  const { opcao } = props
  const classe = opcao.isAdd ? 'opcao-add' : 'opcao-default'
  const impar = opcao.id % 2 === 0 ? 'user-opcao-impar' : null

  return (
    <NavLink to={opcao.url}>
      <div className={`m-1 row  user-opcao ${classe} ${impar}`}>
        <div className="opcao-icone">{opcao.nome}</div>
      </div>
    </NavLink>
  )
}

export default UserOpcao
