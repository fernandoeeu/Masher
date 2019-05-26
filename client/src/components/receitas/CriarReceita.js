import React, { useState, useEffect, useContext } from "react";
import { toJS } from 'mobx'
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";
import axios from "axios";
import firebase from "firebase";


import { categoriasPrincipais, categoriasSecundarias } from '../categorias/categoriasData'

import CategoriaPrincipal from '../categorias/CategoriaPrincipal'
import CategoriaSecundaria from '../categorias/CategoriaSecundaria'
import Ingrediente from '../ingrediente/Ingrediente'

import { ingr } from './ing/ingredientes'

import './style/main.scss'

const CriarReceita = observer(props => {

  const uiStore = useContext(UiStoreContext);

  const [ing, setIng] = useState('')
  const [qtd, setQtd] = useState('')
  const [tempo, setTempo] = useState('')
  const [custo, setCusto] = useState('')
  const [dificuldade, setDificuldade] = useState('')
  const [passos, setPassos] = useState('')
  const [titulo, setTitulo] = useState('');
  const [receita, setReceita] = useState({})
  const [uid, setUid] = useState()

  useEffect(() => {
    if (props.receitaEditar) {
      const { receitaEditar } = props
      const { custo, dificuldade, nome, passos, tempo } = receitaEditar
      //ingredientes
      receitaEditar.ingredientes.map(ing => uiStore.addIngredientes(ing))
      // categorias
      uiStore.replaceCategoriaPrincipal(receitaEditar.categoriasPrincipais)
      uiStore.replaceCategoriaSeundaria(receitaEditar.categoriasSecundarias)
      setTitulo(nome)
      setCusto(custo)
      setDificuldade(dificuldade)
      setPassos(passos)
      setTempo(tempo)
    } else {
      uiStore.clearFields()
    }


  }, [])

  const limparCampos = () => {
    setIng('')
    setQtd('')
    setTempo('')
    setCusto('')
    setDificuldade('')
    setPassos('')
    setTitulo('')
    setReceita('')

    uiStore.clearFields()
  }




  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid)
      }
    })
  }

  const addIngredientes = () => {
    const tmpIng = ing + ' - ' + qtd

    //setIngredientes([...ingredientes, tmpIng])
    uiStore.addIngredientes(tmpIng)
    setIng('')
    setQtd('')
  }



  const onHandleSubmit = async () => {
    const newReceita = {
      titulo,
      ingredientes: toJS(uiStore.ingredientes),
      categoriasPrincipais: toJS(uiStore.categoriaPrincipal),
      categoriasSecundarias: toJS(uiStore.categoriaSecundaria),
      tempo,
      custo,
      dificuldade,
      passos,
      uid
    };
    setReceita(newReceita)
    //console.log(newReceita)
    if (props.receitaEditar) {
      console.log('editar!!')
      axios.post(`api/receitas/atualizar`, newReceita)
        .then(res => {
          if (res.status === 200) {
            console.log('atualizou com sucesso!')
            limparCampos()
            uiStore.changeConteudoAtual('Suas Receitas')
            props.closeModal()
          } else {
            console.log('n sei oq houve')
          }

        })
        .catch(err => console.log("erro ao atualizar", err));
    } else {

      axios
        .post("/api/receitas/criar", newReceita, {
          // headers: {
          //   "x-auth-token": this.state.userToken
          // }
        })
        .then(res => {
          if (res.status === 200) {
            // redireciona para pagina de receitas criadas
            console.log('funcionou!')
            limparCampos()
            uiStore.changeConteudoAtual('Suas Receitas')

          }
        })
        .catch(err => console.log("erro", err));
    }
  };

  const checkFields = () => {
    if (uiStore.ingredientes.length > 0 && passos.length > 0 && titulo.length > 0 && uiStore.categoriaPrincipal.length > 0 && uiStore.categoriaSecundaria.length > 0) {
      return true
    } else {
      return false
    }

  }


  return (
    <div className="container">
      <p className="nome-receita">Nome da receita <span className="obrigatorio">*</span></p>
      <div className="input-group mb-3">
        <input value={titulo} onChange={e => setTitulo(e.target.value)} type="text" className="form-control" aria-label="Text input with dropdown button" />
      </div>

      {/* Categorias Principais */}
      <p className="categorias-principais">Categorias Principais <span className="obrigatorio">*</span></p>
      <div className="d-flex flex-wrap">
        {
          categoriasPrincipais.map(categoria => <CategoriaPrincipal key={categoria.id} categoria={categoria} />)
        }
      </div>

      {/* Categorias secundárias */}
      <p className="categorias-secundarias">Categorias Secundárias <span className="obrigatorio">*</span></p>

      <div className="d-flex flex-wrap justify-content-center my-5">
        {
          // toJS(uiStore.categoriaSecundaria).map((cs, i) => <CategoriaSecundaria key={i} categoria={cs} />)
          categoriasSecundarias.map(cat => <CategoriaSecundaria key={cat.id} categoria={cat} />)
        }
      </div>

      {/* Ingredientes */}
      <p className="ingredientes">Ingrediente - Quantidade <span className="obrigatorio">*</span></p>
      <p className="label-ingredientes"> Clique para excluir</p>
      <div className="row my-2">
        <div className="col-5">
          <input placeholder="farinha de trigo..." value={ing} onChange={e => setIng(e.target.value)} type="text" className="form-control" name="ing" id="" />
        </div>
        <div className="col-5">
          <input placeholder="100 gramas..." value={qtd} onChange={e => setQtd(e.target.value)} type="text" className="form-control" name="qtd" id="" />
        </div>
        <div className="col-2">
          <button disabled={ing.length > 0 && qtd.length > 0 ? false : true} onClick={() => addIngredientes()} className="btn btn-default">Adicionar</button>
        </div>
      </div>
      <div className="row mx-2 my-2">

        {
          toJS(uiStore.ingredientes.length > 0) ?
            toJS(uiStore.ingredientes).map((ing, i) => <Ingrediente key={i} ingrediente={ing} />) :
            null
        }
      </div>

      {/* passo a passo */}
      <p className="passo-a-passo">Passo a passo <span className="obrigatorio">*</span></p>
      <div className="input-group mb-3">
        <textarea placeholder="explique o processo detalhadamente..." id="passosapasso" value={passos} onChange={e => setPassos(e.target.value)} type="text" className="form-control" aria-label="Text input with dropdown button" />
      </div>

      {/* Tempo estimado - Custo - Dificuldade */}
      <div className="row my-2">
        <div className="col-4">
          <p className="tempo-custo-dificuldade">Tempo estimado (min.)</p>
          <input value={tempo} onChange={e => setTempo(e.target.value)} type="text" className="form-control" name="ing" id="" />
        </div>
        <div className="col-4">
          <p className="tempo-custo-dificuldade">Custo (em reais)</p>
          <input value={custo} onChange={e => setCusto(e.target.value)} type="text" className="form-control" name="qtd" id="" />
        </div>
        <div className="col-4">
          <p className="tempo-custo-dificuldade">Dificuldade</p>
          <select value={dificuldade} onChange={e => setDificuldade(e.target.value)} className="form-control">
            <option>Alta</option>
            <option>Média</option>
            <option>Baixa</option>
          </select>
        </div>
      </div>

      {/* botao enviar */}
      {
        props.receitaEditar ?
          <div className="row my-4">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <div onClick={() => limparCampos()} data-dismiss="modal" className="btn btn-light float-right">Cancelar</div>
              <div onClick={() => onHandleSubmit()} className="btn btn-success float-right">Salvar</div>
            </div>
          </div>
          :
          <div className="row my-4">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <div onClick={() => limparCampos()} className="btn btn-light float-right">Limpar campos</div>
              <div onClick={() => onHandleSubmit()} className="btn btn-success float-right">Criar</div>
              {
                !checkFields() ?
                  <p className="alerta-campos ml-2 mt-2">Preencha todos os campos!</p> :
                  null

              }
            </div>
          </div>

      }

    </div>
  );
})


export default CriarReceita;
