const INITIAL_STATE = {
  user: null,
  isLoading: false,
  hasErroed: false,
  error: {}
}

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_IS_LOADING":
      return {
        ...state,
        user: {},
        isLoading: action.bool,
        hasErroed: false,
        error: {}
      }
    case "SET_USER_HAS_ERRORED":
      return {
        ...state,
        user: {},
        isLoading: false,
        hasErroed: true,
        error: action.error
      }
    case "SET_USER_SUCCESS":
      return {
        ...state,
        user: action.user,
        isLoading: false,
        hasErroed: false,
        error: {}
      }
    default:
      return state;
  }
}

export default user