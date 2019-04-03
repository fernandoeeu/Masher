import React, { useState, useEffect } from 'react'
import './Receitas.css'
import Axios from 'axios';
// import { NavLink, Redirect } from 'react-router-dom'
// Importa o withRouter do pacote react-router
import { withRouter } from 'react-router'

const Receitas = props => {
  const [receitas, setReceitas] = useState([]);

  const gotoReceita = id => {
    Axios.get('/api/receita/' + id)
      .then(res => {
        setReceitas(res.data); // tem um history com action, block, etc... // por causa do withRouter lá pra baixo
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    console.log(props);
    if (receitas.length === 0) return;
    props.history.push({
      pathname: "/show-receita",
      state: { receitas },
      from: props.location
    })
  }, [receitas])

  return (
    <div className="card m-2 ml-auto card-largo card-receita">
      <img src="/" alt="" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{props.nome}</h5>
        <ul>
          {props.ing.map(ing => <li key={ing}>{ing}</li>)}
        </ul>
        <button onClick={() => gotoReceita(props.id)} className="btn btn-primary">Go!</button>
      </div>
    </div>
  )
}

export default withRouter(Receitas)
