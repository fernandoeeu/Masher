import React, { useState, useEffect } from "react";
import Modal from 'react-responsive-modal';
import axios from 'axios';
import $ from 'jquery';

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
  const [isLoading, setIsLoading] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [categorias, setCategorias] = useState([])
  const [receitasPrime, setReceitasPrime] = useState([])

  const removeItemQuery = item => {
    setCategorias([])
    let aux = query.filter(i => i !== item)
    setQuery(aux)
    fetchReceitas(aux)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log(document.body.clientHeight);
    console.log(document.body.clientWidth);

    console.log(categoriaFiltro)
    let receitasOld = receitas
    let categoriasAux = []
    if (receitas.length > 0) {
      receitas.map(receita => {
        receita.categoriasPrincipais.map(cp => {
          if (!categoriasAux.includes(cp.nome)) {
            categoriasAux.push(cp.nome)
          }
        })
        setCategorias(categoriasAux)
      })
      console.log('categorias: ', categorias)
    } else {
      setReceitas(receitasOld)
    }
  }, [receitas])

  const fetchReceitas = query => {
    setIsLoading(true)
    setAtual('')
    console.log(query)
    if (query.length > 0) {
      axios
        .post("/api/receitas", query)
        .then(res => {
          if (res.status === 200) {
            setIsLoading(false)
            // armazenando as receitas no estado local
            if (res.data.length > 0) {
              setReceitas(res.data)
              setReceitasPrime(res.data)

            } else {
              setReceitas([])
              setReceitasPrime([])
            }
          }
        })
        .catch(err => console.log("erro", err));
    } else {
      setReceitas([])
      setReceitasPrime([])
    }
  }

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

  const handleClickQuery = () => {

    // aux = [...query, ...aux, atual]
    // let x
    setQuery([...query, atual])
    fetchReceitas(query)
  }
  useEffect(() => {
    if (query.length > 0) {
      fetchReceitas(query)
    }

  }, [query])

  const handleClickLimpar = () => {
    setQuery('')
    setReceitas([])
    setIsLoading(false)
  }

  const closeModal = () => {
    $("#btn-sair").trigger("click");
  }
  const btnStyle = {
    display: 'none'
  }
  // adicionar ingredientes ao pressionar enter
  const handleKeyDown = e => {
    if (e.key === 'enter') {
      alert('oi')
    }
  }

  // setando o filtro por categorias
  const handleFiltro = categoria => {
    categoriaFiltro === categoria ?
      setCategoriaFiltro('') :
      setCategoriaFiltro(categoria)
  }

  useEffect(() => {
    let receitasAux = []
    console.log(categoriaFiltro)
    if (categoriaFiltro.length > 0) {
      receitas.map(receita => {
        receita.categoriasPrincipais.map(cp => {
          if (cp.nome === categoriaFiltro) {
            receitasAux.push(receita)
          }
        })
      })
      setReceitas(receitasAux)
    } else {
      setReceitas(receitasPrime)
    }
  }, [categoriaFiltro])

  return (
    <div className="container">
      <div className="d-flex flex-column">
        <h4>Busca</h4>
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <div className="row">
              <div className="col-9">
                <input value={atual} onChange={e => setAtual(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Insira ingredientes para busca" />
              </div>
              <div className="col-1">
                <button disabled={query.length > 0 ? false : true} className="btn btn-light" onClick={() => handleClickLimpar()}>
                  Limpar
                </button>
              </div>
              <div className="col-2">
                <button type="submit" id="adicionar" disabled={atual.length > 0 ? false : true} className="btn btn-success" onClick={() => handleClickQuery()}>
                  Adicionar
                </button>
              </div>
            </div>
            <small id="emailHelp" className="form-text text-muted">Clique em um ingrediente para removê-lo</small>
          </div>
        </form>
        <div className="d-flex">
          {
            query.length > 0 ? query.map((item, i) => <div key={i} onClick={() => removeItemQuery(item)}> <IngredienteBusca nome={item} /></div>) : null
          }
        </div>
        {
          !isLoading ?
            <>
              {
                categorias.length > 0 ?
                  <>
                    <div className="flex-grid-quantidade-receitas"><p>{receitas.length} receitas encontradas</p></div>
                    <div className="flex-grid-filtro">
                      {categorias.map(categoria => {
                        return <div onClick={() => handleFiltro(categoria)} key={categoria}
                          className={
                            "filtro" + (categoriaFiltro === categoria ? " filtro-active" : "")}>{categoria}</div>
                      })}
                    </div></> :
                  null

              }
              <div className='flex-grid-receitas'>
                {
                  receitas.length > 0 ?
                    receitas.map(receita => <div key={receita._id} onClick={() => handleClickReceita(receita._id)} data-toggle="modal" data-target=".bd-example-modal-xl"><UserReceita receita={receita} /></div>) :
                    null
                }
              </div>
            </> :
            <h2>Loading</h2>
        }

        {/* modal */}
        <div id="modal-receita" className="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="container-fluid">
                {/* fim row switch edicao */}

                {
                  receitaModal ?
                    <div className="row my-2">
                      <div className="col-12">
                        <h2 className="text-center font-weight-bold">{receitaModal.nome}</h2>
                      </div>

                      <div className="col-6">
                        <h3 className="text-center">Ingredientes</h3>
                        <div className="col-12 ing-table my-4">
                          <ul>
                            {
                              receitaModal.ingredientes.map(ing => <li>{ing}</li>)
                            }
                          </ul>
                        </div>
                      </div>
                      <div className="col-6">
                        <h3 className="text-center">Detalhes</h3>
                        <div className="col-12 ing-table my-4">
                          <ul>
                            <li>Demora em média {receitaModal.tempo} minutos</li>
                            <li>Custa aproximadamente R$ {receitaModal.custo}</li>
                            <li>Nível de dificuldade </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-12">
                        <h3 className="text-center">Passos</h3>
                        <div className="col-11 ing-table my-4 mx-auto">
                          <h5 className="text-left p-2">
                            {receitaModal.passos}
                          </h5>
                        </div>
                      </div>
                    </div> : null

                }

              </div>
            </div>
          </div>
        </div>

      </div>
    </div >
  );
};

export default Busca;
