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
  const [imagem, setImagem] = useState()
  const [url, setUrl] = useState()

  useEffect(() => {
    // console.log('receita para editar: ', props.receitaEditar._id)
    if (props.receitaEditar) {
      const { receitaEditar } = props
      const { custo, dificuldade, nome, passos, tempo, image } = receitaEditar
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
      setUrl(image)
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
    setImagem('')

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

  const updateReceita = async () => {
    const newReceita = {
      titulo,
      ingredientes: toJS(uiStore.ingredientes),
      categoriasPrincipais: toJS(uiStore.categoriaPrincipal),
      categoriasSecundarias: toJS(uiStore.categoriaSecundaria),
      tempo,
      custo,
      dificuldade,
      passos,
      uid,
      _id: props.receitaEditar._id
    };
    setReceita(newReceita)

    axios.post(`api/receitas/atualizar`, newReceita).
      then(res => {
        if (res.status === 200) {
          // redireciona para pagina de receitas criadas
          let imgOutput = document.getElementById("img")
          if (!imgOutput || res.data.url === "" || imgOutput.src === res.data.url) {
            props.closeModal()
            uiStore.changeConteudoAtual('Suas Receitas')
            limparCampos()
          }

          else {
            uploadImagem(res.data.id)
          }
        }

      })
  }

  const onHandleImagem = e => {
    setImagem(e.target.files[0])

  }

  const uploadImagem = id => {

    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dnpo8spfa/upload`
    const CLOUDNARY_UPLOAD_PRESET = 'd1fmbyex'
    const file = imagem
    let formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDNARY_UPLOAD_PRESET)
    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    }).then(res => {
      if (props.receitaEditar) {
        console.log(res.data.url)

        updateImagem(id, res.data.url)
        props.closeModal()


      }
      console.log('imagem enviada com sucesso!')
      console.log(res.data.url)
      updateImagem(id, res.data.url)
      limparCampos()

    }).catch(err => console.log(err))
  }

  const updateImagem = (id, url) => {
    try {
      axios.post("/api/receitas/imagem", {
        id,
        url
      }).then(
        res => {
          console.log(res)
          uiStore.changeConteudoAtual('Suas Receitas')
        }
      ).catch(e => console.log(e))
    } catch (e) {
      console.log(e)
    }
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
    if (validateFields(custo, tempo)) {
      setReceita(newReceita)

      axios
        .post("/api/receitas/criar", newReceita, {
          // headers: {
          //   "x-auth-token": this.state.userToken
          // }
        })
        .then(res => {
          if (res.status === 200) {
            // redireciona para pagina de receitas criadas
            uploadImagem(res.data.id)
          }
        })
        .catch(err => console.log("erro", err));
    } else {
      alert('Custo e tempo estimado são campos apenas numéricos!')
    }


  };

  const validateFields = (custo, tempo) => {
    // const numberRegex = /^[0-9]*$/g;
    // const custoResult = numberRegex.exec(custo)
    // const tempoResult = numberRegex.exec(tempo)
    // if (custoResult === null || tempoResult === null) {
    //   return false
    // }
    return true
  }

  const checkFields = () => {
    if (uiStore.ingredientes.length > 0 && passos.length > 0 && titulo.length > 0 && uiStore.categoriaPrincipal.length > 0 && uiStore.categoriaSecundaria.length > 0) {
      return true
    } else {
      return false
    }

  }

  useEffect(() => {
    if (typeof imagem !== 'undefined') {
      console.log('imagem mudou')
      let reader = new FileReader()
      let imgOutput = document.getElementById("img")
      reader.onload = e => {
        console.log(imgOutput)
        imgOutput.src = e.target.result
      }
      if (typeof imagem === 'object' && typeof imagem !== null) {
        reader.readAsDataURL(imagem);
      }

    }
  }, [imagem])

  useEffect(() => {
    if (typeof url !== 'undefined') {
      let imgOutput = document.getElementById("img")
      console.log(imgOutput)
      imgOutput.src = url
    }
  }, [url])


  return (
    <div className="container">
      <p className="nome-receita">Nome da receita <span className="obrigatorio">*</span></p>
      <div className="input-group mb-3">
        <input value={titulo} onChange={e => setTitulo(e.target.value)} type="text" className="form-control" aria-label="Text input with dropdown button" />
      </div>

      <p className="nome-receita">Imagem</p>
      <div className="input-group mp3">
        <div class="upload-btn-wrapper">
          <button class="btn-input-file">Escolha uma imagem</button>
          <input type="file" onChange={(e) => onHandleImagem(e)} />
        </div>

      </div>

      {
        imagem || url ?
          <img id="img" src="" alt="Sua imagem" max-width="200" /> :
          <div className="placeholder-imagem"></div>
      }


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
          <input placeholder="100 gramas..." value={qtd} onChange={e => setQtd(e.target.value)} type="text" className="form-control" name="ing" id="" />
        </div>
        <div className="col-5">
          <input placeholder="farinha de trigo..." value={ing} onChange={e => setIng(e.target.value)} type="text" className="form-control" name="ing" id="" />
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
        <textarea rows="10" placeholder="explique o processo detalhadamente..." id="passosapasso" value={passos} onChange={e => setPassos(e.target.value)} type="text" className="form-control" aria-label="Text input with dropdown button" />
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
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>
        </div>
      </div>

      {/* botao enviar */}
      {
        props.receitaEditar ?
          <div className="row my-4">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <div onClick={() => limparCampos()} data-dismiss="modal" className="btn btn-light float-right">Cancelar</div>
              <div onClick={() => updateReceita()} className="btn btn-success float-right">Salvar</div>
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
