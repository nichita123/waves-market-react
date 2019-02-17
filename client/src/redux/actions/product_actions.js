import axios from 'axios';

import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP
} from './types';

import { PRODUCT_SERVER } from '../../components/utils/misc';

export function getProductsBySell(){
  //?sortBy=sold&order=desc&limit=4
  const req = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(res => res.data)

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: req
  }
}

export function getProductsByArrival(){
  const req = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(res => res.data)

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: req
  }
}

export function getProductsToShop(skip, limit, filters=[], previousState=[]){
  const data = {
    limit,
    skip,
    filters
  }

  const req = axios.post(`${PRODUCT_SERVER}/shop`, data)
    .then(res => {
      return {
        size: res.data.size,
        articles: res.data.articles
      }
    });

  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: req
  }
}

//////////////////////////////
/////    CATEGORIES    ///////
//////////////////////////////

export function getBrands(){
  const req = axios.get(`${PRODUCT_SERVER}/brands`)
    .then(res => res.data)

  return {
    type: GET_BRANDS,
    payload: req
  }
}

export function getWoods(){
  const req = axios.get(`${PRODUCT_SERVER}/woods`)
  .then(res => res.data)

  return {
    type: GET_WOODS,
    payload: req
  }
}