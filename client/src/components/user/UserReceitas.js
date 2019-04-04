import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import UserReceita from './UserReceita'
import axios from 'axios';

import Receitas from "../receitas/Receitas";

const UserReceitas = props => {
  //const { receitas, user } = props

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [userReceitas, setUserReceitas] = useState([])

  const fetchUserReceitas = () => {
    axios.post('/api/receitas/busca/5ca4bd972738aa688c1fbd8b')
      .then(res => {
        setUserReceitas(res.data)
      })
      .catch(err => console.log("Erro", err.response))

  }

  useEffect(() => {
    fetchUserReceitas()
  }, [])

  useEffect(() => {
    console.log(userReceitas)
  }, [userReceitas])

  return (
    <div className="container">
      <h2>{userReceitas.length}</h2>
      {/* <div className="row"> */}

      {userReceitas.map(receita => <Receitas key={receita._id} id={receita._id} nome={receita.nome} ing={receita.ing} />)}
      {/* </div> */}
    </div>

  )
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps)(UserReceitas)
