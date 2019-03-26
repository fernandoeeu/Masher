import React, { Component } from 'react'
import axios from 'axios'

import Navbar from './navbar/Navbar'
import Receitas from './receitas/Receitas'

import './Home.css'

class Home extends Component {
  state = {
    receitas: null
  }
  fetchTodas = () => {
    axios.get('/api/receitas/all')
      .then(res => {
        this.setState({
          receitas: [res.data]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  fetchFiltrado = () => {
    axios.get('/api/receitas')
      .then(res => {
        this.setState({
          receitas: [res.data]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  clear = () => {
    this.setState({ receitas: null })
  }


  render() {

    return (
      <>
        <Navbar />
        <div className="container">
          <div className="row">
            <button onClick={this.fetchTodas} className="btn btn-default">TODAS</button>
            <button onClick={this.fetchFiltrado} className="btn btn-default">FILTRADO</button>
            <button onClick={this.clear} className="btn btn-default">LIMPAR</button>
            {this.state.receitas ? <h4>{this.state.receitas[0].length} receitas foram encontradas</h4> : null}
          </div>
          <div className="scrolling-wrapper">
            {this.state.receitas ? this.state.receitas[0].map(receita => {
              return <Receitas key={receita.id} nome={receita.nome} id={receita._id} ing={receita.ing} />
            }) : null}
          </div>
        </div>
      </>
    )
  }
}

export default Home