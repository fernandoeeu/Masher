const INITIAL_STATE = {
  pessoaAtiva: {},
  pessoas: [
    { id: 1, nome: "Fernando" },
    { id: 2, nome: "Anna" },
    { id: 3, nome: "Matheus" }
  ]
};

export default function curso(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "TOGGLE_PESSOA":
      return { ...state, pessoaAtiva: action.pessoa };
    default:
      return state;
  }
}