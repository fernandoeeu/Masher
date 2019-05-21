import React, { useEffect, useState } from "react";
import firebase from 'firebase';

import './style/visaoGeral.scss'

const VisaoGeral = () => {

  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email)
        setUserName(user.displayName)
      }
    })
  }

  return (
    <div className="d-flex m-4">
      <div className="container">
        <p className="dados-pessoais">Dados Pessoais</p>
        <p className="username-label mt-3">Nome de usuário</p>
        <p className="username">{userName}</p>
        <p className="email-label">E-mail</p>
        <p className="email">{email}</p>
      </div>

    </div>
  );
};

export default VisaoGeral;
