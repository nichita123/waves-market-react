import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_TO_SHOP,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  CLEAR_EDIT_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_PRODUCT,
  GET_BRANDS,
  ADD_BRAND,
  GET_WOODS,
  ADD_WOOD
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };

    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };

    case GET_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };

    case CLEAR_PRODUCT_DETAIL:
      return { ...state, productDetail: action.payload };

    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size
      };

    case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };

    case EDIT_PRODUCT:
      return { ...state, updateProductDetail: action.payload };

    case CLEAR_EDIT_PRODUCT:
      return { ...state, clearUpdateProductDetail: action.payload };

    case REMOVE_PRODUCT:
      return { ...state, removeProduct: action.payload };

    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };

    case GET_BRANDS:
      return { ...state, brands: action.payload };

    case ADD_BRAND:
      return {
        ...state,
        addBrands: action.payload.success,
        brands: action.payload.brands
      };

    case GET_WOODS:
      return { ...state, woods: action.payload };

    case ADD_WOOD:
      return {
        ...state,
        addWood: action.payload.success,
        woods: action.payload.woods
      };

    default:
      return state;
  }
}
