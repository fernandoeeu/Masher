import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";

import "./userOpcao.scss";

const UserOpcao = observer(({ opcao }) => {
  const uiStore = useContext(UiStoreContext);
  const clickHandler = nome => {
    uiStore.changeConteudoAtual(nome);
  };

  return (
    <div
      onClick={() => clickHandler(opcao.nome)}
      className={
        "mx-4 user-opcao " +
        (uiStore.conteudoAtual === opcao.nome ? "isActive" : "")
      }
      href=""
    >
      {opcao.nome}
    </div>
  );
});

export default UserOpcao;
