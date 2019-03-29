import { BUSCAR_RECEITAS_FILTRADAS } from '../actions/types'

const INITIAL_STATE = {
  receitas: [],
  isLoading: false,
  hasErrored: false,
  error: {}
}

export default function receita(state = INITIAL_STATE, action) {
  switch (action.type) {
    // case BUSCAR_RECEITAS_FILTRADAS:
    //   return action.data
    case "FETCH_RECEITAS_FILTRADAS_IS_LOADING":
      return {
        ...state,
        receitas: [],
        isLoading: action.bool,
        hasErrored: false,
        error: {}
      }
    case "FETCH_RECEITAS_FILTRADAS_HAS_ERRORED":
      return {
        ...state,
        receitas: [],
        isLoading: false,
        hasErrored: true,
        error: action.error
      }
    case "FETCH_RECEITAS_FILTRADAS_SUCCESS":
      return {
        ...state,
        receitas: action.receitas,
        isLoading: false,
        hasErrored: false,
        error: {}
      }
    default:
      return state
  }
}



// entendi

// então só ajeita a fetchReceitasFiltradas pra retornar 
// deu response error 500 lul ele tá dando get na porta errada
// xhr.js:173 GET http://localhost:3000/api/receitas 500 (Internal Server Error)
// deveria ser porta 5000
// voltei, que estranho
// isso daí ao invés de response.data, e depois testa
// agora nao deu erro, porem nada aconteceu
// olha a store do redux na redux devtools
// hmm funcionou
// devo só ter que dar fetch diferente no componente
// como vc ta fazendo agora? o que?