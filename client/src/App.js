import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UiStoreContext } from "./stores/UiStore";


import Landing from "./components/Landing.js";
import Sidebar from "./components/sidebar/Sidebar";
import UserProfile from "./components/user/UserProfile";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import HasUser from "./components/auth/HasUser";
import HasntUser from "./components/auth/HasntUser";
import Error from "./components/Error";

import { Provider } from "mobx-react";

import "./app.scss";

const App = observer(() => {
  const UiStore = useContext(UiStoreContext);

  return (
    <Provider UiStore={UiStore}>
      <Router>
        <HasntUser path="/" component={Landing} exact />
        <HasUser path="/home" component={Sidebar} exact />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Router>
    </Provider>
  );
});

export default App;
