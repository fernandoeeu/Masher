import React from "react";
import { Route, Link } from "react-router-dom";

import "./style/main.scss";

const Sidebar = ({ routes }) => {
  return (
    <>
      <div
        class="main-div"
        style={{
          padding: "10px",
          width: "20%"
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/Perfil">Perfil</Link>
          </li>
        </ul>
        {routes
          ? routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))
          : null}
      </div>
      <div style={{ flex: 1 }}>
        {routes
          ? routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default Sidebar;
