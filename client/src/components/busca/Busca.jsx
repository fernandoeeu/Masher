import React, { useState, useEffect } from "react";
import Modal from 'react-responsive-modal';
import axios from 'axios';

import IngredienteBusca from '../ingrediente/IngredienteBusca';
import UserReceita from '../user/UserReceita';

import './style/main.scss'

const Busca = () => {
  const [atual, setAtual] = useState('')
  const [query, setQuery] = useState([])
  const [receitas, setReceitas] = useState([])
  const [counter, setCounter] = useState(0)
  const [open, setOpen] = useState(false);
  const [receitaModal, setReceitaModal] = useState(null);
  const [ingModal, setIngModal] = useState();

  const removeItemQuery = item => {
    setQuery(query.filter(i => i !== item))
  }

  useEffect(() => {
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
          res.data.length > 0 ? setReceitas(res.data) : setReceitas([])
        }
      })
      .catch(err => console.log("erro", err));
  }, [query])

  const handleClickReceita = async id => {
    try {
      const receita = await axios.get(`/api/receitas/busca/${id}`)
      if (receita) {
        setOpen(true)
        setReceitaModal(receita.data)

      }
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className="container">
      <div className="d-flex flex-column">
        <h4>Busca</h4>
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-group">
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
            <small id="emailHelp" className="form-text text-muted">Clique em um ingrediente para removê-lo</small>
          </div>
        </form>
        <div className="d-flex">
          {
            query.map((item, i) => <IngredienteBusca key={i} nome={item} onClick={() => removeItemQuery(item)} />)
          }
        </div>
        <h4>Foram encontradas {counter} receitas!</h4>
        <div className='d-flex'>
          {
            receitas.length > 0 ?
              receitas.map(receita => <div key={receita._id} onClick={() => handleClickReceita(receita._id)}><UserReceita receita={receita} /></div>) :
              null
          }
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          {
            receitaModal ?
              <div className="row receita-modal">
                <div className="col-sm-12"><h3>{receitaModal.nome}</h3></div>
                <h5>Ingredientes</h5>
                <div className="col-sm-12">
                  <ul>
                    {
                      receitaModal.ingredientes.map((ing, i) => <li key={i}>{ing}</li>)
                    }
                  </ul>
                </div>
                <h5>Passo a passo</h5>
                <div className="col-sm-12">
                  <p>{receitaModal.passos}</p>
                </div>
              </div>



              :
              null
          }
        </Modal>
      </div>
    </div >
  );
};

export default Busca;
