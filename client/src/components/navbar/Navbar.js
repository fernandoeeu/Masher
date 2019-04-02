import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
  componentDidMount() {

  }
  render() {
    const { user } = this.props.user
    console.log('a', user)
    return (
      <div>

        <nav className="navbar fixed-bottom navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Masher
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">

              {user ? (
                <>
                  <span>Olá, {user.nome}</span>
                  <NavLink to="/receita/criar" className="nav-item nav-link" href="#">Criar receita</NavLink>
                  <NavLink to="/perfil" className="nav-item nav-link active">Perfil</NavLink>
                  <NavLink to="/signout" className="nav-item nav-link">Sair</NavLink>
                </>
              ) : <NavLink to="/signin" className="nav-item nav-link">Sign in</NavLink>}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

// const mapDispatchToProps = dispatch

export default connect(mapStateToProps)(Navbar)

