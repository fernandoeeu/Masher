import React, { useState, useEffect } from 'react'
import './Receitas.css'
import axios from 'axios';
// import { NavLink, Redirect } from 'react-router-dom'
// Importa o withRouter do pacote react-router
import { withRouter } from 'react-router'

const Receitas = props => {
  const [receita, setReceita] = useState([]);

  const gotoReceita = async id => {
    try {
      const res = await axios.get(`/api/receitas/busca/${id}`)
      setReceita(res.data)
    } catch (err) {
      console.log(err)
    }

    // axios.get(`/api/receitas/busca/${id}`)
    //   .then(res => {
    //     setReceitas(res.data); // tem um history com action, block, etc... // por causa do withRouter lá pra baixo
    //     console.log(id)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  useEffect(() => {
    if (receita.length === 0) return;
    props.history.push({
      pathname: "/show-receita",
      state: { receita },
      from: props.location
    })
  }, [receita])

  return (
    <div className="my-card m-2 ml-auto card-largo card-receita">
      <div className="my-card-img" />
      <div className="my-card-body">
        <p className="my-card-title">{props.receita.nome}</p>
        <a onClick={() => gotoReceita(props.receita.id)} className="">Go!</a>
      </div>
    </div>
  )
}

export default withRouter(Receitas)
