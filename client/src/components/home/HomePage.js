import React from "react";

import Receitas from "../receitas/Receitas";
import Msg from "../messages/Mensagem";
import UserAcaoRapida from "../user/UserAcaoRapida";
import Categoria from "../categorias/Categoria";

const HomePage = ({ msg, error, categorias, receitas }) => {
  return (
    <>
      <div className="input-group my-3">
        <input type="text" className="form-control" />
      </div>
      {msg ? <Msg type="sucesso" msg={msg} /> : null}
      {error ? <Msg type="erro-login" msg={error} /> : null}
      <div className="row first-section">
        {" "}
        {/* Begin first row */}
        <h5 className="ml-3 ms-gray">
          {/* AÇÕES RÁPIDAS - {this.state.me.displayName} */}
        </h5>
        <div className="scrolling-wrapper wrapper-acoes-rapidas">
          <div className="d-flex flex-row">
            <UserAcaoRapida isAdd={true} />
            <UserAcaoRapida />
            <UserAcaoRapida />
            <UserAcaoRapida />
          </div>
        </div>
      </div>{" "}
      {/* End first row */}
      <div className="row second-section">
        {" "}
        {/* Begin second row */}
        <h5 className="ml-3 mt-3 ms-gray"> CATEGORIAS</h5>
        <div className="scrolling-wrapper wrapper-categorias">
          <div className="d-flex flex-row">
            {categorias
              ? categorias.map(categoria => <Categoria nome={categoria.nome} />)
              : null}
          </div>
        </div>
      </div>{" "}
      {/* End second row */}
      <div className="row third-section">
        {" "}
        {/* Begin third row */}
        <h5 className="ml-3 mt-3 ms-gray"> HISTÓRICO</h5>
        <div className="scrolling-wrapper wrapper-categorias">
          <div className="d-flex flex-row">
            {categorias
              ? categorias.map(categoria => <Categoria nome={categoria.nome} />)
              : null}
          </div>
        </div>
      </div>{" "}
      {/* End third row */}
      <div className="row fourth-section">
        {" "}
        {/* Begin fourth row */}
        <h5 className="ml-3 mt-3 ms-gray"> EM DESTAQUE</h5>
        <div className="scrolling-wrapper wrapper-categorias">
          <div className="d-flex flex-row">
            {receitas
              ? receitas.map(receita => <Receitas receita={receita} />)
              : null}
          </div>
        </div>
      </div>{" "}
      {/* End fourth row */}
    </>
  );
};

export default HomePage;
