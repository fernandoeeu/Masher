import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Signin extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form>
              <h4 className="my-3">Entrar</h4>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Senha" />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign in</button>
              </div>
              <h4 className="mt-4 mb-3">Não é cadastrado?</h4>
              <div className="form-group">
                <NavLink to="/signup" className="btn btn-danger btn-block">Sign up</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signin