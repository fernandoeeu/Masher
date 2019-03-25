import React, { Component } from 'react'

import Receitas from './receitas/Receitas'

class Home extends Component {
  state = {
    receitas: null
  }


  render() {
    if (this.props.receitas) {
      this.props.receitas.map(receita => {

      })

    }

    return (
      <>

        <div className="d-flex flex-row flex-wrap justify-content-around">
          {this.props.receitas ? this.props.receitas[0].map(receita => {
            return <Receitas key={receita.id} nome={receita.nome} id={receita._id} ing={receita.ing} />
          }) : null}
        </div>
      </>
    )
  }
}

export default Home