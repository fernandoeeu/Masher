import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import firebase from 'firebase'

const HasUser = ({ component: Component, ...rest }) => {
  // const [hasUser, setHasUser] = useState(false)
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     user ? setHasUSer(true) : setHasUser(false)
  //   })

  // }, []);
  return (
    <Route
      {...rest}
      render={props => {
        if (firebase.auth().onAuthStateChanged) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: "/", from: props.location }} />;
        }


      }}
    />
  );
};

export default HasUser;
