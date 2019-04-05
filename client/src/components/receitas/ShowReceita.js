import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowReceita = props => {
  const { receita } = props.location.state
  const [ingFromProps, setIngFromProps] = useState('')
  const [catFromProps, setCatFromProps] = useState('')
  const [nomeFromProps, setNomeFromProps] = useState(receita.nome)
  useEffect(() => {
    setIngFromProps(joinElements(receita.ing))
    setCatFromProps(joinElements(receita.cat))
  }, [])

  // const { value: titulo, bind: bindTitulo, reset: resetTitulo } = useInput(receita.nome)
  // const { value: ing, bind: bindIng, reset: resetIng } = useInput("")
  // const { value: cat, bind: bindCat, reset: resetCat } = useInput("")
  const joinElements = arr => {
    return arr.join(", ")
  }
  // const [titulo, settitulo] = useState('')
  const handleSubmit = async e => {
    e.preventDefault()
    const newReceita = {
      titulo: nomeFromProps,
      categorias: catFromProps,
      ingredientes: ingFromProps
    }
    try {
      const res = await axios.post(`/api/receitas/atualizar/${receita.id}`, newReceita)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="container">
      <h4 className="mt-3 mb-5">Editar receita</h4>
      <form onSubmit={e => this.onHandleSubmit(e)}>
        <div className="form-group">
          <h5 htmlFor="titulo">Título</h5>
          <input
            value={nomeFromProps}
            onChange={e => setNomeFromProps(e.target.value)}
            name="titulo"
            type="text"
            className="form-control"
          />
          <small className="form-text text-muted">
            Aqui vai o nome da sua receita
            </small>
        </div>
        <div className="form-group">
          <h5 htmlFor="ing">Ingredientes</h5>
          <input
            value={ingFromProps}
            onChange={e => setIngFromProps(e.target.value)}
            name="ingredientes"
            type="text"
            className="form-control"
          />
          <small className="form-text text-muted">
            Entre com os Ingredientes separados por vírgula
            </small>
        </div>
        <div className="form-group">
          <h5 htmlFor="cat">Categorias</h5>
          <input
            value={catFromProps}
            onChange={e => setCatFromProps(e.target.value)}
            name="categorias"
            type="text"
            className="form-control"
          />
          <small className="form-text text-muted">
            As categorias que sua receita se encaixa
            </small>
        </div>
        <button onClick={(e) => handleSubmit(e)} className="btn btn-outline-success btn-block">Atualizar</button>
      </form>
    </div>
  )
}

export default ShowReceita
