import axios from 'axios'
import { BUSCAR_RECEITAS_FILTRADAS } from './types'

export const fetchData = data => {
  return {
    type: BUSCAR_RECEITAS_FILTRADAS,
    data
  }
}

// ela está rodando ok
// depois que eu implementar o redux e o thunk vou medir esforcos pra deixar tudo com hooks...
// Eu mexi na tua configuração da store um pouquinho
// Instala a extensão do redux devtools pra poder debugar
// mexendo com o thunk sempre sao 2 actions ? uma dando fetch e uma setando?
// hooks são legais e.e
// eu vi um codigo usando esses status nas funcoes, mas nao enetndi onde elas sao instanciadas
// normalmente eu retorno um {...data, success: true} do banco
// entendi, vc conseguiu perceber pq nao deu certo o thunk com meu codigo?
// Ele ta levantando algum erro? // aquele warning de que tem que usar middleware pra async code
// eu normalmente faço desse jeito aqui com thunk ->

/*const fetchBooks = () => async (dispatch, getState) => {
  const response = await axios.post(url, data);
  dispatch(fetchBooksIsLoading(true));

  if (response.success) {
    return dispatch(fetchBooksSuccess(response.data));
  }
  
  return dispatch(fetchBooksHasErrored(response.error));
}

const fetchBooksIsLoading = (bool) => ({
  type: "FETCH_BOOKS_IS_LOADING",
  bool
})

const fetchBooksHasErrored = (error) => ({
  type: "FETCH_BOOKS_HAS_ERRORED",
  error
})

const fetchBooksSuccess = (books) => ({
  type: "FETCH_BOOKS_SUCCESS",
  books
})*/

export const fetchReceitasFiltradas = () => async (dispatch, /* getState? (opcional) */) => {
  /*axios
    .get("/api/receitas")
    .then(res => {
      // dispatch(fetch(res))
      // o que esse res tem que retornar? é um array de objetos
    })
    .catch(err => {
      console.log(err);
    });*/

  // Eu vou pro reducer agora
  dispatch(fetchReceitasFiltradasIsLoading(true));
  try {
    const response = await axios.get("/api/receitas");
    dispatch(fetchReceitasFiltradasSuccess(response));
  } catch (error) {
    dispatch(fetchReceitasFiltradasHasErrored(error));
  }
}

const fetchReceitasFiltradasIsLoading = (bool) => ({
  type: "FETCH_RECEITAS_FILTRADAS_IS_LOADING",
  bool
})

const fetchReceitasFiltradasHasErrored = (error) => ({
  type: "FETCH_RECEITAS_FILTRADAS_HAS_ERRORED",
  error
})

const fetchReceitasFiltradasSuccess = (receitas) => ({
  type: "FETCH_RECEITAS_FILTRADAS_SUCCESS",
  receitas
})

// Experimenta tentar isso daqui denovo