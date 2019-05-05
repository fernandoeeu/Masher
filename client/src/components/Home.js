/*
{receitas
                ? receitas.map(receita => {
                  return (
                    <Receitas
                      key={receita.id}
                      nome={receita.nome}
                      id={receita._id}
                      ing={receita.ing}
                    />
                  );
                })
                : "Nada para mostrar"}
*/

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import firebase from "firebase";

import Receitas from "./receitas/Receitas";
import Msg from "../components/messages/Mensagem";
import UserAcaoRapida from "../components/user/UserAcaoRapida";
import Categoria from "../components/categorias/Categoria";
import Sidebar from "./sidebar/Sidebar";

import "./Home.scss";

class Home extends Component {
  state = {
    receitas: null,
    user: null,
    msg: null,
    error: null,
    categorias: null,
    me: null
  };
  componentDidMount() {
    // firebase
    //   .auth()
    //   .currentUser.uid()
    //   .then(uid => console.log(uid));
    firebase.auth().onAuthStateChanged(user => console.log(user));
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     const me = {
    //       displayName: user.displayName,
    //       email: user.email,
    //       emailVerified: user.emailVerified,
    //       photoURL: user.photoURL,
    //       isAnonymous: user.isAnonymous,
    //       uid: user.uid,
    //       providerData: user.providerData
    //     };
    //     this.setState({
    //       me: me
    //     });
    // User is signed in
    // } else {
    //   console.log("no user");
    // }
    // });

    // this.state.me ? console.log(this.state.me) : console.log("sem eu");
    if (JSON.parse(localStorage.getItem("user"))) {
      const usuario = JSON.parse(localStorage.getItem("user"));
      this.setState({ user: usuario });
      this.props.setUser(usuario);
    }
    const history = this.props.location;
    // if (history.data) {
    //   this.setState({ msg: history.data.msg });
    // } else {
    //   this.setState({ msg: null });
    // }
    // if (history.state) {
    //   if (history.state.error) {
    //     this.setState({ error: history.state.error });
    //   }
    // } else {
    //   this.setState({ error: null });
    // }
    this.fetchCategorias();
    this.fetchTodas();
  }

  fetchCategorias = async () => {
    try {
      const categorias = await axios.get("/api/categorias");
      this.setState({ categorias: categorias.data });
      console.log(this.state.categorias);
    } catch (err) {
      console.log("Erro ao buscar categorias: " + err);
    }
  };

  // useEffect(() => {

  // }, [])

  fetchTodas = () => {
    axios
      .get("/api/receitas/all")
      .then(res => {
        this.setState({
          receitas: res.data
        });
        console.log(this.state.receitas);
      })
      .catch(err => {
        console.log(err);
      });
  };
  fetchFiltrado = () => {};

  clear = () => {
    this.setState({ receitas: null });
  };

  render() {
    const {} = this.props;
    const { msg, error } = this.state;
    return (
      <>
        <div className="d-flex">
          <Sidebar />
        </div>
      </>
    );
  }
}

export default Home;
