import React, { useState, useEffect, useContext } from "react";
import Modal from 'react-responsive-modal';
import UserReceita from "./UserReceita";
import firebase from "firebase";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";
import $ from 'jquery';

import CriarReceita from '../receitas/CriarReceita'

import "./userReceitas.scss";

const placeholder = [0, 1, 2, 3]

const UserReceitas = observer(props => {
  const uiStore = useContext(UiStoreContext);

  const [userReceitas, setUserReceitas] = useState([]);
  const [open, setOpen] = useState(false);
  const [receitaModal, setReceitaModal] = useState(null);
  const [isEdit, setIsEdit] = useState(false)

  const fetchUserReceitas = uid => {
    axios
      .post(`/api/receitas/busca/${uid}`)
      .then(res => {
        setUserReceitas(res.data);
      })
      .catch(err => console.log("Erro", err.response));
  };

  useEffect(() => {
    checkUser()


  }, []);

  useEffect(() => {
    console.log(userReceitas)
  }, [userReceitas])

  const checkUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fetchUserReceitas(user.uid);
      }
    })
  }

  const handleClickReceita = async id => {
    uiStore.clearFields()
    setReceitaModal(null)
    try {
      const receita = await axios.get(`/api/receitas/busca/${id}`)
      if (receita) {
        setReceitaModal(receita.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = () => {
    setIsEdit(false)
    uiStore.clearFields()
  }
  const closeModal = () => {
    $("#btn-sair").trigger("click");
  }
  const btnStyle = {
    display: 'none'
  }

  $('#modal-receita').on("hidden.bs.modal", function () {
    alert("clesn up!")
  })


  return (
    <div className="container">
      <div className="d-flex flex-wrap justify-content-center my-5">
        {!userReceitas.length === 0 ?

          userReceitas.length > 0
            ? userReceitas.map(receita => (
              <div key={receita._id} onClick={() => handleClickReceita(receita._id)} data-toggle="modal" data-target=".bd-example-modal-xl">
                <UserReceita receita={receita} />
              </div>
            ))
            : placeholder.map(i => <UserReceita placeholder />)
          :
          <h3>Suas receitas aparecerão aqui quando forem criadas</h3>}

        <div id="modal-receita" className="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="container-fluid">
                <div className="row my-2">
                  <div className="btn-group mx-auto" role="group">
                    <button onClick={() => handleClick()} type="button" className="btn btn-primary">Visualizar</button>
                    <button onClick={() => setIsEdit(true)} type="button" className="btn btn-primary">Editar</button>
                  </div>
                </div> {/* fim row switch edicao */}

                {
                  isEdit === false ?
                    receitaModal ?
                      <div className="row my-2">
                        <div className="col-12">
                          <h2 className="text-center font-weight-bold">{receitaModal.nome}</h2>
                        </div>
                        <div className="col-12">
                          <div className=" flex-div-img">
                            <img src={receitaModal.image} className="img-modal" alt="imagem da receita" height="180" />
                          </div>
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
                              {
                                receitaModal.tempo ?
                                  <li>Demora em média {receitaModal.tempo} minutos</li> :
                                  null
                              }
                              {
                                receitaModal.custo ?
                                  <li>Custa aproximadamente R$ {receitaModal.custo}</li> :
                                  null
                              }
                              {
                                receitaModal.dificuldade ?
                                  <li>Nível de dificuldade {receitaModal.dificuldade}</li> :
                                  null
                              }
                            </ul>
                          </div>
                        </div>

                        <div className="col-12">
                          <h3 className="text-center">Passos</h3>
                          <div className="col-11 ing-table my-4 mx-auto">
                            <h5 className="text-left p-2 display-linebreak">
                              {receitaModal.passos}
                            </h5>
                          </div>
                        </div>
                      </div> : <h2 className='mx-auto'>Sua receita aparecerá em instantes</h2>
                    :
                    receitaModal ?
                      <div className="row my-2">
                        <CriarReceita receitaEditar={receitaModal} closeModal={() => closeModal()} />
                        <div id="btn-sair" style={btnStyle} data-dismiss="modal" className="btn btn-light float-right">Cancelar</div>
                      </div> :
                      null
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserReceitas;
