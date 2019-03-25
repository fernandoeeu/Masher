import React, { Component } from 'react';
import axios from 'axios'

import Home from './components/Home.js'
axios.defaults.host = "localhost:3002"

class App extends Component {
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
      <div className="container">
        <div className="row">
          <button onClick={this.fetchTodas} className="btn btn-default">TODAS</button>
          <button onClick={this.fetchFiltrado} className="btn btn-default">FILTRADO</button>
          <button onClick={this.clear} className="btn btn-default">LIMPAR</button>
          {this.state.receitas ? <h4>{this.state.receitas[0].length} receitas foram encontradas</h4> : null}
        </div>
        <Home receitas={this.state.receitas} />
      </div>
    );
  }
}

export default App;
