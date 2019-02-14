import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout";
import Home from "./components/Home/";

import RegisterLogin from "./components/Register_Login/";
import Register from "./components/Register_Login/Register";
import UserDashboard from "./components/User";

import Auth from "./hoc/auth";

const Routes = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact component={
            Auth(Home, null)
          } />
          <Route path="/login" exact component={
            Auth(RegisterLogin, false)
          } />
          <Route path="/register" exact component={
            Auth(Register, false)
          } />
          <Route path="/user/dashboard" exact component={
              Auth(UserDashboard, true)
          } />
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
