// Coloca a rota de receitas aqui no BrowserRouter
// eala ja nao está? nao estou entendendo essa parte
// Ahhh, entendi
// Ela ta sendo carregada pela página home né?  tipo isso
// https://stackoverflow.com/questions/52064303/reactjs-pass-props-with-redirect-component
// Faz o seguinte então, saca
//  vou ver, hmm, nao deu ele dá o console mas n redireciona
// Mudei algumas coisas, e provavelmente vai funcionar
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home.js";
import Navbar from "./components/navbar/Navbar";
import ShowReceita from "./components/receitas/ShowReceita";
import CriarReceita from "./components/receitas/CriarReceita";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Error from "./components/Error";

import { Provider } from "react-redux";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/show-receita" component={ShowReceita} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/receita/criar" component={CriarReceita} />
            <Route component={Error} />
          </Switch>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
