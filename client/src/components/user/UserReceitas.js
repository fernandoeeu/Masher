import React from 'react'
import UserReceita from './UserReceita'

const UserReceitas = props => {
  const { receitas } = props
  return (
    <div>
      {receitas.map(receita => <UserReceita />)}
    </div>
  )
}

export default UserReceitas
