import React, { useState, useEffect } from "react";
import UserReceita from "./UserReceita";
import firebase from "firebase";
import axios from "axios";

import Receitas from "../receitas/Receitas";

import "./userReceitas.scss";

const UserReceitas = props => {
  //const { receitas, user } = props

  const [uid, setUid] = useState();
  const [userReceitas, setUserReceitas] = useState([]);

  const fetchUserReceitas = () => {
    axios
      .post(`/api/receitas/busca/JjiIxVqOWsMYZpIxjbg8RnZTcv72`)
      .then(res => {
        console.log(res);
        setUserReceitas(res);
      })
      .catch(err => console.log("Erro", err.response));
  };

  useEffect(() => {
    try {
      firebase.auth().onAuthStateChanged(user => {
        setUid(user.uid);
      });
    } catch (e) {
      console.log(e);
    }

    fetchUserReceitas();
  }, []);

  return (
    <div className="container">
      <h2>{userReceitas.length}</h2>
      <div className="row">
        {userReceitas
          ? userReceitas.map(receita => (
              <div className="receita">
                {" "}
                <Receitas receita={receita} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default UserReceitas;
