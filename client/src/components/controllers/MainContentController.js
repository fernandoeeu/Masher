import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/Navbar";
import Inicio from "../inicio/Inicio";


import Busca from '../busca/Busca'
import UserReceitas from "../user/UserReceitas";
import CriarReceitas from "../receitas/CriarReceita";
import EmDestaque from "../inicio/emDestaque/EmDestaque";
import Favoritos from "../inicio/favoritos/Favoritos";
import Notificacoes from "../user/Notificacoes";
import VisaoGeral from "../user/VisaoGeral";
import EditarPerfil from "../user/EditarPerfil";

import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";

const MainContentController = observer(() => {
  const uiStore = useContext(UiStoreContext);
  const { conteudoAtual } = uiStore;
  const compAtual = uiStore.sideMenuActiveItem;
  const [content, setContent] = useState("");

  const inicioOpcoes = [
    {
      id: 0,
      nome: "Em Destaque"
    },
    {
      id: 1,
      nome: "Favoritos"
    }
  ];
  const buscaOpcoes = [
    {
      id: 0,
      nome: "Busca Inteligente"
    },
    {
      id: 1,
      nome: "busca 02"
    }
  ];
  const dashboardOpcoes = [
    {
      id: 0,
      nome: "Suas Receitas"
    },
    {
      id: 1,
      nome: "Criar Receita"
    },
    {
      id: 2,
      nome: "Notificações"
    }
  ];
  const perfilOpcoes = [
    {
      id: 0,
      nome: "Visão Geral"
    },
    {
      id: 1,
      nome: "Editar Perfil"
    }
  ];

  const changeContent = nome => {
    console.log(nome);
    setContent(nome);
  };

  const switchNavbar = () => {
    switch (compAtual) {
      case "Início":
        return <Navbar opcoes={inicioOpcoes} />;
      case "Busca":
        return <Navbar opcoes={buscaOpcoes} />;
      case "Dashboard":
        return <Navbar opcoes={dashboardOpcoes} />;
      case "Perfil":
        return <Navbar opcoes={perfilOpcoes} />;
      default:
        return <Navbar opcoes={inicioOpcoes} />;
    }
  };

  const switchContent = () => {
    switch (conteudoAtual) {
      case "Em Destaque":
        return <EmDestaque />;
      case "Favoritos":
        return <Favoritos />;
      case "Suas Receitas":
        return <UserReceitas />;
      case "Criar Receita":
        return <CriarReceitas />;
      case "Notificações":
        return <Notificacoes />;
      case "Visão Geral":
        return <VisaoGeral />;
      case "Editar Perfil":
        return <EditarPerfil />;
      case "Busca Inteligente":
        return <Busca />;
      default:
        return <EmDestaque />;
    }
  };

  return (
    <>
      <div className="col-12">{switchNavbar()}</div>
      <div className="col-12">{switchContent()}</div>
    </>
  );
});

export default MainContentController;
