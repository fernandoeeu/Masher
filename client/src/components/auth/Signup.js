import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import Mensagem from "../messages/Mensagem";

export default class Signup extends Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senha2: "",
    erros: null,
    redirect: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { nome, email, senha, senha2 } = this.state;
    axios
      .post("/api/register", {
        nome,
        email,
        senha,
        senha2
      })
      .then(res => {
        if (res.data.erros) {
          this.setState({ erros: null });
          console.log(res.data.erros);
          this.setState({ erros: res.data.erros });
        } else {
          console.log(res);
          this.setState({ erros: null });
          return this.props.history.push({
            pathname: "/signin",
            state: [
              {
                status: 200
              },
              {
                email: email,

              }
            ],
            from: this.props.location
          });
        }
      });
  };

  render() {
    const { erros } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form onSubmit={e => this.onSubmit(e)}>
              <h4 className="my-3">Cadastrar</h4>

              {erros
                ? erros.map(erro => (
                  <Mensagem key={erro.msg} msg={erro.msg} type={"erro"} />
                ))
                : null}

              <div className="form-group">
                <input
                  onChange={e => this.onChange(e)}
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  name="nome"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={e => this.onChange(e)}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={e => this.onChange(e)}
                  type="password"
                  className="form-control"
                  placeholder="Senha"
                  name="senha"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={e => this.onChange(e)}
                  type="password"
                  className="form-control"
                  placeholder="Confirme sua senha"
                  name="senha2"
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign up</button>
              </div>
              <h4 className="mt-4 mb-3">Já é cadastrado?</h4>
              <div className="form-group">
                <NavLink to="/signin" className="btn btn-danger btn-block">
                  Sign in
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
