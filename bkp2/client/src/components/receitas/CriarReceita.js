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
  componentDidMount() {
    console.log(localStorage.getItem("token"));
  }

  onHandleSubmit = e => {
    const { titulo, ingredientes, categorias } = this.state;
    e.preventDefault();
    const ingArr = ingredientes.split(",");
    const catArr = categorias.split(",");
    const newReceita = {
      titulo,
      ingredientes: ingArr,
      categorias: catArr
    };
    this.setState({
      receita: newReceita
    });
    const token = localStorage.getItem("token");

    const headers = {
      "x-auth-token": localStorage.getItem("token")
    };

    const uri = "api/receitas/criar";

    axios
      .post("/api/receitas/criar", newReceita, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      })
      .then(res => console.log("res", res))
      .catch(err => console.log("erro", err));

    // axios
    //   .post(uri, headers, newReceita)
    // .then(res => console.log("asdasd", res))
    // .catch(err => console.log("erro", err));
    // .post("receitas/criar", {
    //   token,
    //   newReceita
    // })
    // .then(res => console.log("Res: " + res.body))
    // .catch(err => "err" + err);
    // .post("/api/receitas/criar", {
    //   headers: {
    //     "x-auth-token": localStorage.getItem("token")
    //   }
    // })
    //console.log(newReceita)
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
