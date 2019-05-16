import React, { useState, useEffect } from "react";
import axios from 'axios'



const Busca = () => {
  const [atual, setAtual] = useState('')
  const [query, setQuery] = useState([])
  const [receitas, setReceitas] = useState([])
  const [counter, setCounter] = useState(0)

  const removeItemQuery = item => {
    setQuery(query.filter(i => i !== item))
  }

  useEffect(() => {
    //console.log(receitas.length)
    setCounter(receitas.length)
  }, [receitas])

  useEffect(() => {
    axios
      .post("/api/receitas", query, {
        // headers: {
        //   "x-auth-token": this.state.userToken
        // }
      })
      .then(res => {
        if (res.status === 200) {
          // armazenando as receitas no estado local
          res.data.length > 0 ? setReceitas([res.data]) : setReceitas([])
        }
      })
      .catch(err => console.log("erro", err));
  }, [query])

  return (
    <div className="container">
      <div className="d-flex flex-column">
        <h4>Busca</h4>
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <div className="row">
              <div className="col-10">
                <input value={atual} onChange={e => setAtual(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Insira ingredientes para busca" />
              </div>
              <div className="col-2">
                <button disabled={atual.length > 0 ? false : true} className="btn btn-success" onClick={() => setQuery([...query, atual])}>
                  Adicionar
                </button>
              </div>
            </div>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        </form>
        <ul>
          {
            query.map((item, i) => <li onClick={() => removeItemQuery(item)} key={i}>{item}</li>)
          }
        </ul>
        <h4>Foram encontradas {counter} receitas!</h4>
        <ul>
          {
            receitas.length > 0 ?
              receitas.map(receita => <li>{receita.nome}</li>) :
              null
          }
        </ul>
      </div>
    </div>
  );
};

export default Busca;
