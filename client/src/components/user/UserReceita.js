import React from 'react'

const UserReceita = props => {
  const { receita } = props
  return (
    <div className="col-md-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{receita.nome}</h5>
          <div className="btn-group" role="group">
            <button className="btn btn-primary">Editar</button>
            <button className="btn btn-danger">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserReceita
