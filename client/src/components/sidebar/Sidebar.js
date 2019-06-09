import React, { useState, useEffect, useContext } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";
import firebase from 'firebase'
import $ from 'jquery'

import "./style/main.scss";
import MainContentController from "../controllers/MainContentController";

const Sidebar = observer(({ location }) => {
  const uiStore = useContext(UiStoreContext);
  const opcoes = [
    // {
    //   id: 0,
    //   nome: "Início",
    //   conteudo: "Em Destaque",
    //   auth: false
    // },
    {
      id: 1,
      nome: "Busca",
      conteudo: "Busca Inteligente",
      auth: false
    },
    {
      id: 2,
      nome: "Dashboard",
      conteudo: "Suas Receitas",
      auth: true
    },
    {
      id: 3,
      nome: "Perfil",
      conteudo: "Visão Geral",
      auth: true
    }
  ];

  const clickHandler = (conteudo, nome) => {
    uiStore.changeConteudoAtual(conteudo);
    uiStore.changeSideMenuActiveItem(nome);
  };

  const gotoSignin = () => {
    return <Redirect to='/signin' />
  }

  const sair = () => {
    firebase.auth().signOut()
    document.cookie = "hasUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear()
    uiStore.changeConteudoAtual('Em Destaque');
    uiStore.changeSideMenuActiveItem('Início');
    window.location.reload();
  }

  return (
    <>
      <div className="d-flex flex-row background-default">
        <div className="col-3 main-div" style={{}}>
          <div className="d-flex flex-column p-1 sidebar-wrapper">
            <div className="row py-3 px-4">
              <h2>Masher</h2>
            </div>
            <div className="row flex-column">
              {opcoes.map((opcao, i) => (
                opcao.auth === true ? (document.cookie ?
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
                  </div> :
                  null
                ) :
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
              {
                document.cookie ?
                  <div class="sidebar-item pl-4 remove-navLink" data-toggle="modal" data-target="#modalSair">
                    Sair
                  </div> :
                  <NavLink to="/signin" className="sidebar-item pl-4 remove-navlink">
                    Entrar
                  </NavLink>

              }
            </div>
          </div>
        </div>
        <div className="col-9 conteudo"><MainContentController /></div>

        {/* modal */}
        <div className="modal" id="modalSair" tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nunca é um adeus</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Você está prestes a deslogar de nosso incrível site...</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" data-dismiss="modal">Voltar</button>

                <NavLink to="/home" className="btn-inside-modal btn" data-dismiss="modal" onClick={() => sair()}>
                  Sair
                </NavLink>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Sidebar;
