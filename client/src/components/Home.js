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
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CursoActions from "../store/actions/curso";
import * as ReceitaActions from "../store/actions/receita";
import * as UserActions from "../store/actions/user";

import Receitas from "./receitas/Receitas";
import Msg from '../components/messages/Mensagem'
import UserAcaoRapida from '../components/user/UserAcaoRapida'

import "./Home.css";

class Home extends Component {
  state = {
    receitas: null,
    user: null,
    msg: null,
    error: null,
    categorias: null
  };
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user"))) {
      const usuario = JSON.parse(localStorage.getItem("user"));
      this.setState({ user: usuario });
      this.props.setUser(usuario);
    }
    const history = this.props.location
    if (history.data) {
      this.setState({ msg: history.data.msg })
    } else {
      this.setState({ msg: null })
    }
    if (history.state) {
      if (history.state.error) {
        this.setState({ error: history.state.error })
      }
    } else {
      this.setState({ error: null })
    }
    this.fetchCategorias()
  }

  fetchCategorias = async () => {
    try {
      const categorias = await axios.get('/api/categorias')
      this.setState({ categorias: categorias.data })
      console.log(this.state.categorias)
    } catch (err) {
      console.log("Erro ao buscar categorias: " + err)
    }
  }

  // useEffect(() => {

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
  fetchFiltrado = () => { };

  clear = () => {
    this.setState({ receitas: null });
  };

  render() {
    const {
      pessoas,
      togglePessoa,
      pessoaAtiva,
      fetchReceitasFiltradas,
      receitas
    } = this.props;
    const { msg, error } = this.state
    //console.log(this.props.location)
    return (
      <>
        {/* {this.state.user ? <h1>Bem-vindo(a), {this.state.user.nome}</h1> : null} */}
        <div className="container">
          <div className="input-group my-3">
            <input type="text" className="form-control" />
          </div>
          {msg ? <Msg type="sucesso" msg={msg} /> : null}
          {error ? <Msg type="erro-login" msg={error} /> : null}
          <div className="row first-section"> {/* Begin first row */}
            <h5 className="ml-3 ms-gray">AÇÕES RÁPIDAS</h5>
            {this.state.receitas ? (
              <h4>
                {this.state.receitas[0].length} receitas foram encontradas
              </h4>
            ) : null}
            <div className="scrolling-wrapper wrapper-acoes-rapidas">
              <div className="d-flex flex-row">
                <UserAcaoRapida isAdd={true} />
                <UserAcaoRapida />
                <UserAcaoRapida />
                <UserAcaoRapida />
              </div>
            </div>
          </div> {/* End first row */}

          <div className="row second-section"> {/* Begin second row */}
            <h5 className="ml-3 mt-3 ms-gray"> CATEGORIAS</h5>
            <div className="scrolling-wrapper wrapper-categorias">
              <div className="d-flex flex-row">
                {this.state.categorias ? this.state.categorias.map(categoria => <h3 className="mx-2">{categoria.nome}</h3>) : null}
              </div>
            </div>
          </div> {/* End second row */}

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
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    Object.assign({}, CursoActions, ReceitaActions, UserActions),
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
