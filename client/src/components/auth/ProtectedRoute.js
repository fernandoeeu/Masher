import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (localStorage.getItem('token') !== null) {
          return <Component {...props} />
        } else {
          console.log('aaa', auth.authenticated)
          return <Redirect to={
            {
              pathname: "/",
              state: { error: "Usuário precisa estar logado para acessar esta página" },
              from: props.location
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute
