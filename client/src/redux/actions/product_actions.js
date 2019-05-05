import axios from 'axios';

import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_TO_SHOP,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
  CLEAR_PRODUCT,
  EDIT_PRODUCT,
  CLEAR_EDIT_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  GET_BRANDS,
  ADD_BRAND,
  GET_WOODS,
  ADD_WOOD
} from './types';

import { PRODUCT_SERVER } from '../../components/utils/misc';

export function getProductDetail(id){
  const req = axios.get(`${PRODUCT_SERVER}/articles-by-id?id=${id}&type=single`)
    .then(res => {
      return res.data[0]
    })

  return {
    type: GET_PRODUCT_DETAIL,
    payload: req
  }
}

export function clearProductDetail(){
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
  }
}

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
    filters,
  }

  const req = axios.post(`${PRODUCT_SERVER}/shop`, data)
    .then(res => {
      let newState = [
        ...previousState,
        ...res.data.articles
      ]

      return {
        size: res.data.size,
        articles: newState
      }
    });

  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: req
  }
}

export function addProduct(dataToSubmit){
  const req = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then(res => res.data)

    return {
      type: ADD_PRODUCT,
      payload: req
    }
}



export function updateProduct(id, dataToSubmit){
  const req = axios.post(`${PRODUCT_SERVER}/article/${id}`, dataToSubmit)
    .then(res => res.data);

    return {
      type: EDIT_PRODUCT,
      payload: req
    }
}

export function clearUpdateProduct(){
  return { 
    type: CLEAR_EDIT_PRODUCT,
    payload: ''
  }
}

export function removeProduct(id){
  const req = axios.delete(`${PRODUCT_SERVER}/article/${id}`)
    .then(res => res.data)

    return {
      type: REMOVE_PRODUCT,
      payload: req
    }
}

export function clearProduct(){
  return {
    type: CLEAR_PRODUCT,
    payload: ''
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

export function addBrand(dataToSubmit, existingBrands){
  const req = axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
    .then(res => {
      let brands = [
        ...existingBrands,
        res.data.brand
      ];
      return {
        success: res.data.success,
        brands
      }
    });

    return {
      type: ADD_BRAND,
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

export function addWood(dataToSubmit, existingWoods){
  const req = axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
    .then(res => {
      let woods = [
        ...existingWoods,
        res.data.wood
      ];

      return {
        success: res.data.success,
        woods
      }
    });

    return {
      type: ADD_WOOD,
      payload: req
    }
}
