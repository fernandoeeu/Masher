import React from 'react'

import {NavLink} from 'react-router-dom'
import './landing.scss'

const Landing = props => {
  return (
      <div className="content">
      <div className="container">
        <div className="main-text">
          <div className="d-flex flex-column justify-content-center heading">
            <p className="m-0 py-1">Busca por receitas</p>
          </div>
          <div className="d-flex flex-column justify-content-center subheading">
            <p className="m-0 py-1">como você nunca viu</p>
          </div>
        </div>
        <div className="grid-buttons d-flex flex-column">
          <div className="mx-auto d-flex flex-column justify-content-center button-sign-up text-center">
            <NavLink to="/signup">
              <div className="sign-up">Sign up</div>
            </NavLink>
          </div>
          <div className="mx-auto my-2 d-flex flex-column justify-content-center button-sign-in">
            <NavLink to="/signin">
              <div className="sign-in">Sign in</div>
            </NavLink>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Landing
