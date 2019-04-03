import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../store/actions/user";
import axios from "axios";

class CriarReceita extends Component {
  state = {
    titulo: "",
    ingredientes: [],
    categorias: [],
    receita: {}
  };

  onHandleSubmit = e => {
    const { titulo, ingredientes, categorias } = this.state;
    e.preventDefault();
    const ingArr = ingredientes.split(",");
    const catArr = categorias.split(",");
    const newReceita = {
      titulo,
      ingredientes: ingArr,
      categorias: catArr,
      user: JSON.parse(localStorage.getItem('user'))
    };
    this.setState({
      receita: newReceita
    });
    axios
      .post("/api/receitas/criar", newReceita, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.status === 200) {
          return this.props.history.push({
            pathname: "/",
            data: {
              msg: "Receita adicionada com sucesso"
            },
            from: this.props.location
          })
        }
      })
      .catch(err => console.log("erro", err));
  };
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="container">
        <h4 className="mt-3 mb-5">Criar receita</h4>
        <form onSubmit={e => this.onHandleSubmit(e)}>
          <div className="form-group">
            <h5 htmlFor="titulo">Título</h5>
            <input
              name="titulo"
              onChange={e => this.onInputChange(e)}
              type="text"
              className="form-control"
            />
            <small className="form-text text-muted">
              Aqui vai o nome da sua receita
            </small>
          </div>
          <div className="form-group">
            <h5 htmlFor="ing">Ingredientes</h5>
            <input
              name="ingredientes"
              onChange={e => this.onInputChange(e)}
              type="text"
              className="form-control"
            />
            <small className="form-text text-muted">
              Entre com os Ingredientes separados por vírgula
            </small>
          </div>
          <div className="form-group">
            <h5 htmlFor="cat">Categorias</h5>
            <input
              name="categorias"
              onChange={e => this.onInputChange(e)}
              type="text"
              className="form-control"
            />
            <small className="form-text text-muted">
              As categorias que sua receita se encaixa
            </small>
          </div>
          <button className="btn btn-outline-success btn-block">Enviar</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, UserActions), dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CriarReceita);
