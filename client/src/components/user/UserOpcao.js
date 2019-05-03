import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./userOpcao.scss";

const UserOpcao = ({ opcao, changeComponent }) => {
  // let [ativo, setAtivo] = useState(false);

  return (
    <div
      onClick={() => changeComponent(opcao.nome)}
      className="mx-4 user-opcao"
      href=""
    >
      {opcao.nome}
    </div>
  );
};

export default UserOpcao;
