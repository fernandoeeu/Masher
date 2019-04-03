import { combineReducers } from 'redux'

import curso from './curso'
import receita from './receita'
import user from './user'

export default combineReducers({
  curso,
  receita,
  user
})