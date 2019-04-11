import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import UserReceita from './UserReceita'
import axios from 'axios';

import Receitas from "../receitas/Receitas";

import './userReceitas.scss'

const UserReceitas = props => {
  //const { receitas, user } = props

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [userReceitas, setUserReceitas] = useState([])

  const fetchUserReceitas = () => {
    axios.post(`/api/receitas/busca/${user.id}`)
      .then(res => {
        setUserReceitas(res.data)
      })
      .catch(err => console.log("Erro", err.response))

  }

  useEffect(() => {
    fetchUserReceitas()
  }, [])

  return (
    <div className="container">
      <h2>{userReceitas.length}</h2>
      <div className="row">
        {userReceitas
          ? userReceitas.map(receita => <div className="receita"> <Receitas receita={receita} /></div>)
          : null
        }
      </div>




    </div>

  )
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps)(UserReceitas)
