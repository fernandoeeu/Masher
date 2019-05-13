import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";
import firebase from 'firebase'

import "./style/main.scss";
import MainContentController from "../controllers/MainContentController";

const Sidebar = observer(({ location }) => {
  const uiStore = useContext(UiStoreContext);
  const opcoes = [
    {
      id: 0,
      nome: "Início",
      conteudo: "Em Destaque"
    },
    {
      id: 1,
      nome: "Busca",
      conteudo: "Busca 01"
    },
    {
      id: 2,
      nome: "Dashboard",
      conteudo: "Suas Receitas"
    },
    {
      id: 3,
      nome: "Perfil",
      conteudo: "Visão Geral"
    }
  ];
  const [compAtual, setCompAtual] = useState("Início");
  const changeComponent = nome => {
    console.log(nome);
    setCompAtual(nome);
  };


  const clickHandler = (conteudo, nome) => {
    uiStore.changeConteudoAtual(conteudo);
    uiStore.changeSideMenuActiveItem(nome);
  };

  const sair = () => {
    firebase.auth().signOut()
    console.log('saiu')
    return <Redirect to={{ pathname: "/home", from: location }} />;
  }

  return (
    <>
      <div className="d-flex flex-row">
        <div className="col-3 main-div" style={{}}>
          <div className="d-flex flex-column p-1 sidebar-wrapper">
            <div className="row py-3 px-4">
              <h2>Masher</h2>
            </div>
            <div className="row flex-column">
              {opcoes.map(opcao => (
                <div
                  className={
                    "sidebar-item pl-4 " +
                    (uiStore.sideMenuActiveItem === opcao.nome
                      ? "sidebar-item-active"
                      : "")
                  }
                  key={opcao.id}
                  onClick={() => clickHandler(opcao.conteudo, opcao.nome)}
                >
                  {opcao.nome}
                </div>
              ))}
              <div onClick={() => sair()} className="btn btn-default">Sair!</div>
            </div>
          </div>
        </div>
        <div className="col-9 conteudo"><MainContentController /></div>
      </div>
    </>
  );
});

export default Sidebar;

{
  /* () => changeComponent(opcao.nome) */
}
