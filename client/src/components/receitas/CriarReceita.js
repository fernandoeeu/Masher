import React, { useState, useEffect, useContext } from "react";
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
  const [ingredientes, setIngredientes] = useState([]);
  const [categorias, setCategorias] = useState([])
  const [receita, setReceita] = useState({})
  const [userToken, setUserToken] = useState()
  const [uid, setUid] = useState()

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
    setIngredientes([...ingredientes, tmpIng])
    console.log('ing', ing)
    uiStore.addIngredientes(ing)
    setIng('')
    setQtd('')
  }

  const onHandleSubmit = async () => {
    const newReceita = {
      titulo,
      ingredientes: ingredientes,
      categoriasPrincipais: uiStore.categoriaPrincipal,
      categoriaSecundaria: uiStore.categoriaSecundaria,
      tempo,
      custo,
      dificuldade,
      passos,
      uid
    };
    setReceita(newReceita)
    console.log(newReceita)
    // axios
    //   .post("/api/receitas/criar", newReceita, {
    //     // headers: {
    //     //   "x-auth-token": this.state.userToken
    //     // }
    //   })
    //   .then(res => {
    //     if (res.status === 200) {
    //       // redireciona para pagina de receitas criadas
    //       console.log('funcionou!')
    //       uiStore.changeConteudoAtual('Suas Receitas')
    //     }
    //   })
    //   .catch(err => console.log("erro", err));
  };

  return (
    <div className="container">
      <p className="nome-receita">Nome da receita</p>
      <div className="input-group mb-3">
        <input type="text" className="form-control" aria-label="Text input with dropdown button" />
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
          ingr.map(i => {
            const cp = uiStore.categoriaPrincipal
            if (cp.includes(i.pai)) {
              return <CategoriaSecundaria key={i.nome} categoria={i} />
            }
          })
        }
      </div>

      {/* Ingredientes */}
      <p className="ingredientes">Ingrediente - Quantidade</p>
      <div className="row my-2">
        <div className="col-5">
          <input value={ing} onChange={e => setIng(e.target.value)} type="text" className="form-control" name="ing" id="" />
        </div>
        <div className="col-5">
          <input value={qtd} onChange={e => setQtd(e.target.value)} type="text" className="form-control" name="qtd" id="" />
        </div>
        <div className="col-2">
          <button onClick={() => addIngredientes()} className="btn btn-default">Adicionar</button>
        </div>
      </div>
      <div className="row mx-2 my-2">
        {uiStore.ingredientes.map((ing, i) => <Ingrediente key={i} ingrediente={ing} />)}
      </div>

      {/* passo a passo */}
      <p className="passo-a-passo">Passo a passo - separe por vírgula</p>
      <div className="input-group mb-3">
        <textarea value={passos} onChange={e => setPassos(e.target.value)} type="text" className="form-control" aria-label="Text input with dropdown button" />
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
          <button className="btn btn-danger">Cancelar</button>
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
