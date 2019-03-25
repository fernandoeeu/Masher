import React from 'react'
import './Receitas.css'
import Axios from 'axios';

const Receitas = props => {
  const gotoReceita = id => {
    Axios.get('/api/receita/' + id)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }
  return (
    <div className="card m-2 ml-auto card-largo">
      <img src="/" alt="" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{props.nome}</h5>
        <ul>
          {props.ing.map(ing => <li key={ing}>{ing}</li>)}
        </ul>
        <button href="/" onClick={() => gotoReceita(props.id)} className="btn btn-primary">Go!</button>
      </div>
    </div>
  )
}

export default Receitas
