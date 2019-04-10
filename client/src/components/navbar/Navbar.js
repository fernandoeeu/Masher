// {/* <>
//   <span>Olá, {user.nome}</span>
//   <NavLink
//     to="/receita/criar"
//     className="nav-item nav-link"
//     href="#"
//   >
//     Criar receita
//     </NavLink>
//   <NavLink to="/perfil" className="nav-item nav-link">
//     Perfil
//     </NavLink>
//   <NavLink
//     to="/"
//     className="nav-item nav-link"
//     onClick={() => onClearLocalStorage()}
//   >
//     Sair
//     </NavLink>
// </> */}
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import './navbar.scss'

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
    <nav className="navbar bottom-nav navbar-light fixed-bottom d-flex justify-content-between border-top">
      <button className="btn btn-default ml-4">Home</button>
      <span>MASHER</span>
      <button className="btn btn-default mr-4">{user ? 'Perfil' : 'Entrar'}</button>
    </nav>
  );
}


const mapStateToProps = state => ({
  user: state.user.user
});

// const mapDispatchToProps = dispatch

export default connect(mapStateToProps)(Navbar);
