import React from 'react'

import './userOpcao.scss'

const UserOpcao = props => {
  const { opcao } = props
  const classe = opcao.isAdd ? 'opcao-add' : 'opcao-default'
  return (
    <div className={`m-1 row  user-opcao ${classe}`}>
      <div className="opcao-icone">{opcao.nome}</div>
    </div>
  )
}

export default UserOpcao
