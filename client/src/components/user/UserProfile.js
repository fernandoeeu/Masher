import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

import UserOpcao from "./UserOpcao";

import Navbar from "../navbar/Navbar";

import UserReceitas from "./UserReceitas";
import Lixeira from "./Lixeira";
import CriarReceita from "../receitas/CriarReceita";

import "./userProfile.scss";

class UserProfile extends Component {
  state = {
    actualComponent: "Minhas Receitas"
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
        <Navbar opcoes={opcoes} />
        {switchComponents()}
      </div>
    );
  }
}

export default UserProfile;
