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
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      };
    case GET_CART_ITEMS:
      return {...state, cartDetail: action.payload};
    case REMOVE_CART_ITEMS:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        }
      };
    case ON_SUCCESS_BUY_USER:
      return { 
        ...state,
        successBuy : action.payload.success,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        },
        cartDetail: action.payload.cartDetail
      };
    case UPDATE_USER_PROFILE:
      return {...state, updateUser: action.payload}
    case CLEAR_UPDATE_USER_DATA:
      return {...state, ClearUpdateUser: action.payload}
    default:
      return state;
  }
}
