import React, { Component, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import * as CursoActions from '../store/actions/curso'
import * as ReceitaActions from '../store/actions/receita'
import * as UserActions from '../store/actions/user'

import Receitas from "./receitas/Receitas";

import "./Home.css";

class Home extends Component {
  state = {
    receitas: null,
    user: null
  };
  componentDidMount() {
    if (JSON.parse(localStorage.getItem('user'))) {
      const usuario = JSON.parse(localStorage.getItem('user'))
      this.setState({ user: usuario })
      this.props.setUser(usuario)
    }

  }

  // useEffect(() => {
  //   checkIfSignedIn()
  // }, [])

  fetchTodas = () => {
    axios
      .get("/api/receitas/all")
      .then(res => {
        this.setState({
          receitas: [res.data]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  fetchFiltrado = () => {

  };

  clear = () => {
    this.setState({ receitas: null });
  };



  render() {
    const { pessoas, togglePessoa, pessoaAtiva, fetchReceitasFiltradas, receitas } = this.props;
    console.log(this.state.user)
    return (
      <>
        {this.state.user ? <h1>Bem-vindo(a), {this.state.user.nome}</h1> : null}
        <div className="container">
          <div className="row">
            <button onClick={this.fetchTodas} className="btn btn-default">
              TODAS
            </button>
            <button onClick={fetchReceitasFiltradas} className="btn btn-default">
              FILTRADO
            </button>
            <button onClick={this.clear} className="btn btn-default">
              LIMPAR
            </button>
            {this.state.receitas ? (
              <h4>
                {this.state.receitas[0].length} receitas foram encontradas
              </h4>
            ) : null}
          </div>
          <div className="scrolling-wrapper">
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
              : null}
          </div>
          {pessoas.map(pessoa => {
            return (
              <div key={pessoa.id}>
                <h4>{pessoa.nome}</h4>
                <button className="btn btn-default" onClick={() => togglePessoa(pessoa)}>
                  Toggle Pessoa
                </button>
              </div>
            );
          })}
          {pessoaAtiva ? <h2>{pessoaAtiva.nome}</h2> : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  pessoas: state.curso.pessoas,
  pessoaAtiva: state.curso.pessoaAtiva,
  receitas: state.receita.receitas.data,
  user: state.user.user
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, CursoActions, ReceitaActions, UserActions), dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);
