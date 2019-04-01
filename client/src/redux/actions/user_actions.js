import axios from "axios";

import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEMS,
  ON_SUCCESS_BUY_USER,
  UPDATE_USER_PROFILE,
  CLEAR_UPDATE_USER_DATA
} from "./types";

import { USER_SERVER, PRODUCT_SERVER } from "../../components/utils/misc";

export function addToCart(_id) {
  const req = axios
    .post(`${USER_SERVER}/cart/add?productId=${_id}`)
    .then(res => res.data);

  return {
    type: ADD_TO_CART,
    payload: req
  };
}

export function loginUser(dataToSubmit) {
  const req = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(res => res.data);

  return {
    type: LOGIN_USER,
    payload: req
  };
}

export function registerUser(dataToSubmit) {
  const req = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => res.data);

  return {
    type: REGISTER_USER,
    payload: req
  };
}

export function auth() {
  const req = axios.get(`${USER_SERVER}/auth`).then(res => res.data);

  return {
    type: AUTH_USER,
    payload: req
  };
}

export function logoutUser() {
  const req = axios.get(`${USER_SERVER}/logout`).then(res => res.data);

  return {
    type: LOGOUT_USER,
    payload: req
  };
}

export function getCartItems(cartItems, userCart){
  const req = axios.get(`${PRODUCT_SERVER}/articles-by-id?id=${cartItems}&type=array`)
    .then(res => {
      userCart.forEach(item => {
        res.data.forEach((k, i) => {
          if(item.id === k._id){
            res.data[i].quantity = item.quantity
          }
        })
      });
      return res.data;
    })

  return {
    type: GET_CART_ITEMS,
    payload: req
  }
}

export function removeCartItem(id){
  const req = axios.get(`${USER_SERVER}/cart/remove-item?_id=${id}`)
    .then(res => {
      res.data.cart.forEach(item => {
        res.data.cartDetail.forEach((k, i) => {
          if(item.id === k._id){
            res.data.cartDetail[i].quantity = item.quantity;
          }
        })
      });
      return res.data;
    })

  return {
    type: REMOVE_CART_ITEMS,
    payload: req
  }
}

export function onSuccessBuy(data){
  const req = axios.post(`${USER_SERVER}/success-buy`, data)
    .then(res => res.data);

  return {
    type: ON_SUCCESS_BUY_USER,
    payload: req
  }
}

export function updateUserProfile(dataToSubmit){
  const req = axios.post(`${USER_SERVER}/profile/edit`, dataToSubmit)
    .then((res) => res.data)

  return {
    type: UPDATE_USER_PROFILE,
    payload: req
  }
}

export function clearUpdateUser(){
  return { 
    type: CLEAR_UPDATE_USER_DATA,
    payload: ''
  }
}


