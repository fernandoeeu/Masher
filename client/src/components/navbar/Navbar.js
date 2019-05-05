import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";
import UserOpcao from "../user/UserOpcao";

import "./navbar.scss";

const Navbar = observer(({ opcoes, changeContent }) => {
  const uiStore = useContext(UiStoreContext);

  return (
    <div className="top-nav d-flex flex-row justify-content-center align-items-center">
      {opcoes.map(opcao => (
        <UserOpcao key={opcao.id} opcao={opcao} changeContent={changeContent} />
      ))}
    </div>
  );
});

// const mapDispatchToProps = dispatch

export default Navbar;
