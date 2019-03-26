import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div>

        <nav className="navbar fixed-bottom navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
            Bootstrap
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink to="/" className="nav-item nav-link active">Home <span className="sr-only">(current)</span></NavLink>
              <a className="nav-item nav-link" href="#">Features</a>
              <a className="nav-item nav-link" href="#">Pricing</a>
              <a className="nav-item nav-link disabled" href="#">Disabled</a>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

