import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Wrapper from "./components/wrapper/Wrapper.js";

import Landing from "./components/Landing.js";
import Home from "./components/Home.js";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import ShowReceita from "./components/receitas/ShowReceita";
import CriarReceita from "./components/receitas/CriarReceita";
import UserProfile from "./components/user/UserProfile";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import ProtecedRoute from "./components/auth/ProtectedRoute";
import HasUser from "./components/auth/HasUser";
import HasntUser from "./components/auth/HasntUser";
import UserReceitas from "./components/user/UserReceitas";
import Error from "./components/Error";

import { Provider } from "react-redux";

import store from "./store";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import "./app.scss";

const routes = [
  {
    path: "/home",
    exact: true,
    sidebar: () => <h2>Home</h2>,
    main: () => <Home />
  },
  {
    path: "/perfil",
    exact: true,
    sidebar: () => <h2>Perfil</h2>,
    main: () => <UserProfile />
  }
];

const App = () => {
  const [hasUser, setHasUSer] = useState(false);

  useEffect(() => {
    setHasUSer(true);
  }, [localStorage.getItem("user")]);
  return (
    <Provider store={store}>
      <Router>
        <HasntUser path="/" component={Landing} exact />
        <HasUser path="/home" component={Sidebar} exact />
        <Route path="/show-receita" component={ShowReceita} exact />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/receita/criar" component={CriarReceita} exact />
        <Route path="/perfil" component={UserProfile} exact />
        <Route path="/perfil/receitas" component={UserReceitas} exact />
      </Router>
    </Provider>
  );
};

export default App;
