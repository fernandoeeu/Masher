import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = props => {

  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [localStorage.getItem('user')])
  const onClearLocalStorage = () => {
    localStorage.clear();
    return props.history.push({
      pathname: "/",
      state: { status: 200 },
      from: this.props.location
    });
  };

  return (
    <div>
      <nav className="navbar fixed-bottom navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Masher
          </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {user ? (
              <>
                <span>Olá, {user.nome}</span>
                <NavLink
                  to="/receita/criar"
                  className="nav-item nav-link"
                  href="#"
                >
                  Criar receita
                  </NavLink>
                <NavLink to="/perfil" className="nav-item nav-link">
                  Perfil
                  </NavLink>
                <NavLink
                  to="/"
                  className="nav-item nav-link"
                  onClick={() => onClearLocalStorage()}
                >
                  Sair
                  </NavLink>
              </>
            ) : (
                <NavLink to="/signin" className="nav-item nav-link">
                  Sign in
                </NavLink>
              )}
          </div>
        </div>
      </nav>
    </div>
  );
}


const mapStateToProps = state => ({
  user: state.user.user
});

// const mapDispatchToProps = dispatch

export default connect(mapStateToProps)(Navbar);
