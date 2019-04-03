
export const setUser = () => (dispatch) => {
  dispatch(setUserIsLoading(true))
  try {
    const res = localStorage.getItem('user')
    dispatch(setUserSuccess(res))
  } catch (error) {
    dispatch(setUserHaserrored(error))
  }
}

const setUserIsLoading = (bool) => ({
  type: "SET_USER_IS_LOADING",
  bool
})

const setUserHaserrored = (error) => ({
  type: "SET_USER_HAS_ERRORED",
  error
})

const setUserSuccess = (user) => ({
  type: "SET_USER_SUCCESS",
  user
})