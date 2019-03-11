import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout";
import Auth from "./hoc/auth";

import Home from "./components/Home/";
import Shop from './components/Shop';

import RegisterLogin from "./components/Register_Login/";
import Register from "./components/Register_Login/Register";

import UserDashboard from "./components/User";
import AddProduct from './components/User/Admin/AddProduct';

const Routes = () => {
  return (
    <div>
      <Layout>
        <Switch>
          {/* =======PUBLIC======= */}
          <Route path="/" exact component={
            Auth(Home, null)
          } />
          <Route path="/shop" exact component={
            Auth(Shop, null)
          } />

          {/* ======AUTHENTICATION====== */}
          <Route path="/login" exact component={
            Auth(RegisterLogin, false)
          } />
          <Route path="/register" exact component={
            Auth(Register, false)
          } />
          
          {/* ===========ADMIN=========== */}
          <Route path="/user/dashboard" exact component={
              Auth(UserDashboard, true)
          } />
          <Route path="/admin/products/add" exact component={
              Auth(AddProduct, true)
          } />
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
