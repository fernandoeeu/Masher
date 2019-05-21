import React, { useState, useEffect, useContext } from "react";
import Modal from 'react-responsive-modal';
import UserReceita from "./UserReceita";
import firebase from "firebase";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../stores/UiStore.js";


import "./userReceitas.scss";

const UserReceitas = observer(props => {
  const uiStore = useContext(UiStoreContext);

  const [userReceitas, setUserReceitas] = useState([]);
  const [open, setOpen] = useState(false);
  const [receitaModal, setReceitaModal] = useState(null);

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

  const checkUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fetchUserReceitas(user.uid);
      }
    })
  }

  const handleClickReceita = async id => {
    console.log(id)
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

  const editarReceita = () => {
    uiStore.changeConteudoAtual('Editar Receita');
  }

  return (
    <div className="container">
      <div className="d-flex flex-wrap justify-content-center my-5">
        {userReceitas
          ? userReceitas.map(receita => (
            <div key={receita._id} onClick={() => handleClickReceita(receita._id)}>
              <UserReceita receita={receita} />
            </div>
          ))
          : null}
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
                <button onClick={() => editarReceita()} className="btn btn-default">Editar</button>
              </div>
              :
              null
          }
        </Modal>
      </div>
    </div>
  );
});

export default UserReceitas;
