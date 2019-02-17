import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout";
import Auth from "./hoc/auth";

import Home from "./components/Home/";
import Shop from './components/Shop';

import RegisterLogin from "./components/Register_Login/";
import Register from "./components/Register_Login/Register";
import UserDashboard from "./components/User";




const Routes = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact component={
            Auth(Home, null)
          } />
          <Route path="/shop" exact component={
            Auth(Shop, null)
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
