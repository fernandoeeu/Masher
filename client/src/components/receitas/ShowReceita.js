import React from 'react'

const ShowReceita = props => {
  console.log(props.location.state)
  return (
    <div>
      <h4>Nome: {props.location.state.receitas.nome}</h4>
    </div>
  )
}

export default ShowReceita
