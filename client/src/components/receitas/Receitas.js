import React, { useState, useEffect } from 'react'
import './Receitas.css'
import Axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom'
// Importa o withRouter do pacote react-router
import { withRouter } from 'react-router'

const Receitas = props => {
  const [receitas, setReceitas] = useState([]);

  const gotoReceita = id => {
    Axios.get('/api/receita/' + id)
      .then(res => {
        setReceitas(res.data); // tem um history com action, block, etc... // por causa do withRouter lá pra baixo
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    console.log(props);
    if (receitas.length === 0) return;
    // Verifica se existe history dentro de props travei o chrome kkk pera
    // perfeito
    // Legal
    // Quer uma dica? aham
    // Usa uma Context pra salvar as receitas
    // Daí você vai poder impedir que o usuário acesse aquela rota
    // Se n tiver com as receitas carregadas // vou ver o lance da context, eu to fazendo o back end ne
    // dai o outro dev é la da sala, mas ele mexe com angular T.T, manda o codigo, por favor
    // Esse teclado é meio estranho mac
    // Se quiser código de exemplo, eu tenho
    // https://github.com/Knevari/death_star_lookup/tree/master/src/components
    // Route Customizada pra impedir o acesso => https://github.com/Knevari/death_star_lookup/blob/master/src/components/Routes/DetailsRoute.js
    // Minha context faz a mesma coisa aí 
    // ah sim, pois é, acabou que eu fiquei fazendo o back end, mas nao eh dificil, vc tem acesso ao codigo ai
    // to usando express
    // Todo o backend aqui é feito em express // normal...
    // nao tenho ideia de quanto angular ele saiba, entao n sei como vai ficar esse front end
    // por isso to fazendo em react tambem
    // Eu to trabalhando numa dashboard
    // Já ta pronta
    // As tarefas dessa sprint são // encontrar erros antes de mandar pra produção
    // Tem muito typescript, mas eu não to usando TS ainda, preguiça acho
    // Eu só to trabalhando com o front aqui (e integrando com o backend já pronto), nunca mais fiz autenticação (preciso estudar) oapskpoas // blz
    // Se algum dia quiser fazer internacionalização no app, tem um pacote chamado react-i18next -> É só criar uma pasta com as traduções e carregar no app
    // Eu não tinha a mínima idéia de como fazer antes
    // vou anotar, vou desligar o servidor aqui e comitar, obrgiado pela ajuda hj 
    // Boa tarde, vou comer e.e até
    props.history.push({
      pathname: "/show-receita",
      state: { receitas },
      from: props.location
    })
  }, [receitas])

  return (
    <div className="card m-2 ml-auto card-largo card-receita">
      <img src="/" alt="" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{props.nome}</h5>
        <ul>
          {props.ing.map(ing => <li key={ing}>{ing}</li>)}
        </ul>
        <button onClick={() => gotoReceita(props.id)} className="btn btn-primary">Go!</button>
      </div>
    </div>
  )
}

export default withRouter(Receitas)
