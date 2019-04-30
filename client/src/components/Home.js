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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ReceitaActions from "../store/actions/receita";
import * as UserActions from "../store/actions/user";

import Receitas from "./receitas/Receitas";
import Msg from '../components/messages/Mensagem'
import UserAcaoRapida from '../components/user/UserAcaoRapida'
import Categoria from '../components/categorias/Categoria'

import "./Home.scss";

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
    this.fetchTodas()
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
          receitas: res.data
        });
        console.log(this.state.receitas)
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
        <div className="main-content">
          <div className="row">
            <div className="col-lg-3 col-sm-2 col-xs-2">
              <div className="row">
                <div className="col logo-masher-div"></div>
              </div>
              <div className="row">
                <div className="col side-menu">
                  <div className="row">
                    <div className="col-12 my-2 menu-slot">
                      <div className="menu-item menu-item-active">
                        <h4 className="mx-auto">Início</h4>
                      </div>
                    </div>
                    <div className="col-12 my-2 menu-slot">
                      <div className="menu-item">
                      <NavLink to="/perfil" className="navlink"><h4 className="mx-auto">Perfil</h4></NavLink> :
                        
                      </div>
                    </div>
                    <div className="col-12 my-2 menu-slot">
                      <div className="menu-item">
                        <h4 className="mx-auto">Configurações</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-sm-10 col-xs-10">
              <div className="input-group my-3">
                <input type="text" className="form-control" />
              </div>
              {msg ? <Msg type="sucesso" msg={msg} /> : null}
              {error ? <Msg type="erro-login" msg={error} /> : null}
              <div className="row first-section"> {/* Begin first row */}
                <h5 className="ml-3 ms-gray">AÇÕES RÁPIDAS</h5>
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
                    {this.state.categorias ? this.state.categorias.map(categoria => <Categoria nome={categoria.nome} />) : null}
                  </div>
                </div>
              </div> {/* End second row */}

              <div className="row third-section"> {/* Begin third row */}
                <h5 className="ml-3 mt-3 ms-gray"> HISTÓRICO</h5>
                <div className="scrolling-wrapper wrapper-categorias">
                  <div className="d-flex flex-row">
                    {this.state.categorias ? this.state.categorias.map(categoria => <Categoria nome={categoria.nome} />) : null}
                  </div>
                </div>
              </div> {/* End third row */}

              <div className="row fourth-section"> {/* Begin fourth row */}
                <h5 className="ml-3 mt-3 ms-gray"> EM DESTAQUE</h5>
                <div className="scrolling-wrapper wrapper-categorias">
                  <div className="d-flex flex-row">
                    {this.state.receitas ? this.state.receitas.map(receita => <Receitas receita={receita} />) : null}
                  </div>
                </div>
              </div> {/* End fourth row */}
            </div>
          </div>

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
    Object.assign({}, ReceitaActions, UserActions),
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
