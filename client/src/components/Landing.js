import React from 'react'

import { NavLink } from 'react-router-dom'
import './landing.scss'

const Landing = props => {
  return (
    <div className="content container text-center">
      <div className="row align-items-center">
        <div className="col inner-main">
          <h1 className="mb-1">Masher</h1>
          <h5>Busca por receitas, como você nunca viu.</h5>
          <NavLink to="/signin" className="btn btn-primary mr-2">
            Entrar
          </NavLink>
          <NavLink to="/home" className="btn btn-secondary">
            Convidado
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Landing
