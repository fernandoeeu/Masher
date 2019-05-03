import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import firebase from "firebase";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            return <Component {...props} />;
            // User is signed in
          } else {
            console.log("usuário nao está logado");

            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    error:
                      "Usuário precisa estar logado para acessar esta página"
                  },
                  from: props.location
                }}
              />
            );
          }
        });
        if (firebase.auth().currentUser) {
        } else {
        }
      }}
    />
  );
};

export default ProtectedRoute;
