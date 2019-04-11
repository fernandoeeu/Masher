import React, { Component } from "react";
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import UserOpcao from './UserOpcao'

import './userProfile.scss'

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
        url: '/perfil',
        isAdd: false
      },
      {
        id: 1,
        nome: 'Criar Receita',
        url: '/receita/criar',
        isAdd: true
      },
      {
        id: 2,
        nome: 'Minhas Receitas',
        url: '/perfil/receitas',
        isAdd: false
      },
      {
        id: 3,
        nome: 'Lixeira',
        url: '/perfil',
        isAdd: false
      }
    ]
    console.log(this.props)
    return (
      <div className="container">
        {this.props.user ? <h4> Olá, {this.props.user.nome}</h4> : null}
        <div className="row">
          {
            opcoes.map(opcao => {
              return <div className="opcao"><UserOpcao opcao={opcao} /></div>
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: JSON.parse(state.user.user)
})

export default connect(mapStateToProps)(UserProfile)