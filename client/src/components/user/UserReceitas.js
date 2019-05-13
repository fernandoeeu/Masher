import React, { useState, useEffect } from "react";
import UserReceita from "./UserReceita";
import firebase from "firebase";
import axios from "axios";


import "./userReceitas.scss";

const UserReceitas = props => {
  //const { receitas, user } = props

  const [uid, setUid] = useState();
  const [userReceitas, setUserReceitas] = useState([]);

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
      } else {
        console.log('not signed in')
      }
    })
  }

  return (
    <div className="container">
      <div className="d-flex flex-wrap justify-content-center my-5">
        {userReceitas
          ? userReceitas.map(receita => (
            <UserReceita key={receita._id} receita={receita} />
          ))
          : null}
      </div>
    </div>
  );
};

export default UserReceitas;
