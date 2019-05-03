import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

import UserOpcao from "./UserOpcao";

import UserReceitas from "./UserReceitas";
import Lixeira from "./Lixeira";
import CriarReceita from "../receitas/CriarReceita";

import "./userProfile.scss";

class UserProfile extends Component {
  state = {
    actualComponent: "Minhas Receitas"
  };

  changeComponent = name => {
    console.log(name);
    this.setState({ actualComponent: name });
  };
  render() {
    const opcoes = [
      {
        id: 0,
        nome: "Minhas Receitas"
      },
      {
        id: 1,
        nome: "Criar Receita"
      },
      {
        id: 2,
        nome: "Receitas Favoritas"
      },
      {
        id: 3,
        nome: "Lixeira",
        url: "/perfil"
      }
    ];

    const switchComponents = () => {
      switch (this.state.actualComponent) {
        case "Minhas Receitas":
          console.log(this.state.actualComponent);
          return <UserReceitas />;
        case "Lixeira":
          return <Lixeira />;
        case "Criar Receita":
          return <CriarReceita />;
        default:
          return <UserReceitas />;
      }
    };

    return (
      <div className="d-flex">
        <div className="col">
          <div className="top-nav d-flex flex-row justify-content-center align-items-center">
            {opcoes.map(opcao => (
              <UserOpcao
                key={opcao.id}
                opcao={opcao}
                changeComponent={this.changeComponent}
              />
            ))}
          </div>
          {switchComponents()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userRedux: JSON.parse(state.user.user)
});

export default connect(mapStateToProps)(UserProfile);
