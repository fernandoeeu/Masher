import React, { useState, useEffect, useContext } from "react";
import { toJS } from 'mobx'
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";
import axios from "axios";
import firebase from "firebase";

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
  const [contIngredientes, setContIngredientes] = useState(0)
  const [receita, setReceita] = useState({})
  const [uid, setUid] = useState()

  const limparCampos = () => {
    setIng('')
    setQtd('')
    setTempo('')
    setCusto('')
    setDificuldade('')
    setPassos('')
    setTitulo('')
    setContIngredientes(0)
    setReceita('')

    uiStore.clearFields()
  }


  const categoriasPrincipais = [
    {
      id: 0,
      nome: 'Bebidas',
      sub: ['Drinks', 'Chás', 'Vitaminas', 'Cafés', 'Sucos']
    },
    {
      id: 1,
      nome: 'Tradicional',
      sub: ['Carnes', 'Aves', 'Peixes e Frutos do Mar', 'Sopas', 'Massas', 'Pratos Típicos Brasileiros', 'Pratos Estrangeiros', 'Ovos e Laticínios']
    },
    {
      id: 2,
      nome: 'Acompanhamentos',
      sub: ['Saladas', 'Molhos', 'Aperitivos']
    },
    {
      id: 3,
      nome: 'Lanches',
      sub: ['Bolos e Tortas', 'Doces e Sobremesas', 'Salgados', 'Pães']
    },
    {
      id: 4,
      nome: 'Saudavel',
      sub: ['Light', 'Vegetariano', 'Sem Lactose', 'Sem Glúten', 'Grãos']

    },
    {
      id: 5,
      nome: 'Especiais',
      sub: ['Páscoa', 'Aniversários', 'Festa Junina', 'Natal e Ano Novo', 'Confeitaria']
    },

  ]

  useEffect(() => {
    checkUser()
  }, [])

  // limpando as categorias secundarias caso o usuario desmarque o pai delas
  // useEffect(() => {
  //   const secundarias = toJS(uiStore.categoriaSecundaria)
  //   secundarias.map(i => {
  //     toJS(uiStore.categoriaPrincipal.includes(i.pai) ? console.log('inclui') : console.log(i))
  //   })
  // }, [toJS(uiStore.categoriaPrincipal)])

  const checkUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid)
      } else {
        console.log('not signed in')
      }
    })
  }

  const addIngredientes = () => {
    const tmpIng = {
      nome: ing,
      qtd: qtd
    }
    //setIngredientes([...ingredientes, tmpIng])
    uiStore.addIngredientes(tmpIng)
    setIng('')
    setQtd('')
    setContIngredientes(contIngredientes + 1)
  }

  const onHandleSubmit = async () => {
    const newReceita = {
      titulo,
      ingredientes: toJS(uiStore.ingredientes),
      categoriasPrincipais: toJS(uiStore.categoriaPrincipal),
      categoriasSecundarias: toJS(uiStore.catSecUser),
      tempo,
      custo,
      dificuldade,
      passos,
      uid
    };
    setReceita(newReceita)
    console.log(newReceita)
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
  };

  // set up editor passo a passo


  return (
    <div className="container">
      <p className="nome-receita">Nome da receita</p>
      <div className="input-group mb-3">
        <input value={titulo} onChange={e => setTitulo(e.target.value)} type="text" className="form-control" aria-label="Text input with dropdown button" />
      </div>

      {/* Categorias Principais */}
      <p className="categorias-principais">Categorias Principais</p>
      <div className="d-flex flex-wrap">
        {
          categoriasPrincipais.map(categoria => <CategoriaPrincipal key={categoria.id} categoria={categoria} />)
        }
      </div>

      {/* Categorias secundárias */}
      <p className="categorias-secundarias">Categorias Secundárias</p>

      <div className="d-flex flex-wrap justify-content-center my-5">
        {
          toJS(uiStore.categoriaSecundaria).map((cs, i) => <CategoriaSecundaria key={i} categoria={cs} />)
        }
      </div>

      {/* Ingredientes */}
      <p className="ingredientes">Ingrediente - Quantidade</p>
      <p className="label-ingredientes"> Clique para excluir</p>
      <div className="row my-2">
        <div className="col-5">
          <input placeholder="farinha de trigo..." value={ing} onChange={e => setIng(e.target.value)} type="text" className="form-control" name="ing" id="" />
        </div>
        <div className="col-5">
          <input placeholder="100 gramas..." value={qtd} onChange={e => setQtd(e.target.value)} type="text" className="form-control" name="qtd" id="" />
        </div>
        <div className="col-2">
          <button onClick={() => addIngredientes()} className="btn btn-default">Adicionar</button>
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
      <p className="passo-a-passo">Passo a passo</p>
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
      <div className="row my-4">
        <div className="col-1 offset-10">
          <button className="btn btn-danger" onClick={() => limparCampos()}>Cancelar</button>
        </div>
        <div className="col-1">
          <button onClick={() => onHandleSubmit()} className="btn btn-success">
            Criar
          </button>
        </div>
      </div>

    </div>
  );
})


export default CriarReceita;
