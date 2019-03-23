import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout";
import Auth from "./hoc/auth";

import Home from "./components/Home/";
import Shop from './components/Shop';
import Product from './components/Product';

import RegisterLogin from "./components/Register_Login/";
import Register from "./components/Register_Login/Register";

import UserDashboard from "./components/User";
import UserCart from './components/User/Cart';
import AddProduct from './components/User/Admin/AddProduct';
import ManageCategories from './components/User/Admin/Categories/ManageCategories';

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
          <Route path="/product/detail/:id" exact component={
            Auth(Product, null)
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
          <Route path="/user/cart" exact component={
              Auth(UserCart, true)
          } />
          <Route path="/admin/products/add" exact component={
              Auth(AddProduct, true)
          } />
          <Route path="/admin/categories/manage" exact component={
              Auth(ManageCategories, true)
          } />
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
