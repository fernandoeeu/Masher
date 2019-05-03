import React from "react";
import { Route, Redirect } from "react-router-dom";

const HasUser = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!localStorage.getItem("user")) {
          return <Component {...props} />;
        } else {
          console.log("nonono");
          return <Redirect to={{ pathname: "/home", from: props.location }} />;
        }
      }}
    />
  );
};

export default HasUser;
