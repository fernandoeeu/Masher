import React, { Component } from "react";
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import UserOpcao from './UserOpcao'

class UserProfile extends Component {
  // gotoUserReceitas = () => {
  //   return this.props.history.push({
  //     pathname: "/perfil/receitas",
  //     state: { user: this.props.user },
  //     from: this.props.location
  //   });
  // }
  render() {
    const opcoes = [
      {
        id: 0,
        nome: 'Receitas Favoritas',
        isAdd: false
      },
      {
        id: 1,
        nome: 'Criar Receita',
        isAdd: true
      },
      {
        id: 2,
        nome: 'Minhas Receitas',
        url: 'perfil/receitas',
        isAdd: false
      },
      {
        id: 3,
        nome: 'Lixeira',
        isAdd: false
      }
    ]
    console.log(this.props)
    return (
      <div className="container">
        {this.props.user ? <h4> Olá, {this.props.user.nome}</h4> : null}
        <div className="row">
          <div className="col-sm">
            a
          </div>
          <div className="col-sm">
            a
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: JSON.parse(state.user.user)
})

export default connect(mapStateToProps)(UserProfile)