import React, { useState } from "react";

import UserOpcao from "../user/UserOpcao";
import EmDestaque from "./emDestaque/EmDestaque";
import Favoritos from "./favoritos/Favoritos";

const Inicio = () => {
  const [compAtual, setCompAtual] = useState("Em Destaque");
  const opcoes = [];

  const switchComponents = () => {
    switch (compAtual) {
      case "Em Destaque":
        return <EmDestaque />;
      case "Favoritos":
        return <Favoritos />;
      default:
        return <EmDestaque />;
    }
  };
  const changeComponent = name => {
    console.log(name);
    this.setState({ actualComponent: name });
  };

  return (
    <div className="d-flex flex-column">
      <div className="col">
        <div className="top-nav d-flex flex-row justify-content-center align-items-center">
          {opcoes.map(opcao => (
            <UserOpcao
              key={opcao.id}
              opcao={opcao}
              onClick={() => setCompAtual(opcao.nome)}
            />
          ))}
        </div>
        {switchComponents()}
      </div>
    </div>
  );
};

export default Inicio;
