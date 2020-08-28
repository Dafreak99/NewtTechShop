import {
  LOAD_DATA,
  LOAD_CART,
  ON_SEARCH,
  LOGOUT,
  ON_CHANGE_CART_ITEM_QUANTITY,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_DETAIL_ITEM,
} from "../actions";
import { combineReducers } from "redux";
import authReducer from "./Auth";
const initialState = {
  content: [],
  search: false,
  cart: [],
  matchedItem: null,
};

let reducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...newState,
        content: action.content,
      };
    case LOAD_CART:
      return {
        ...newState,
        cart: action.cart,
      };
    case LOGOUT:
      return {
        ...state,
        cart: [],
      };
    case ON_CHANGE_CART_ITEM_QUANTITY:
      const { value, id } = action;

      let index = newState.cart.findIndex((each) => {
        return each._id === id;
      });

      // ALWAYS GOES FOR THE INDEX THEN CHANGE THE STATE IMMUTABLY
      // BE CAREFUL WITH THE STATE STRUCTURE
      return {
        ...newState,
        cart: [
          ...newState.cart.slice(0, index),
          {
            ...newState.cart[index],
            quantity: parseInt(value),
          },
          ...newState.cart.slice(index + 1),
        ],
        // RECOMMEND USING THIS WAY TO RETURN THE NEW ARRAY STATE
      };
    case ADD_TO_CART:
      let cart;

      let index2 = newState.cart.findIndex(
        (each) => each._id === action.item._id
      );

      if (index2 !== -1) {
        cart = [
          ...newState.cart.slice(0, index2),
          action.item,
          ...newState.cart.slice(index2 + 1),
        ];
      } else {
        cart = [...newState.cart, action.item];
      }

      return {
        ...newState,
        cart,
      };
    case REMOVE_FROM_CART:
      var aaa = newState.cart.findIndex((each) => each !== action.item);

      return {
        ...newState,
        cart: [...newState.cart.slice(0, aaa), ...newState.cart.slice(aaa + 1)],
      };
    case GET_DETAIL_ITEM:
      return {
        ...newState,
        matchedItem: action.matchedItem,
      };
    default:
      return newState;
  }
};

let navbarReducer = (
  state = {
    value: "",
  },
  action
) => {
  switch (action.type) {
    case ON_SEARCH:
      return {
        ...state,
        value: action.value,
      };

    default:
      return state;
  }
};

let rootReducer = combineReducers({
  reducer,
  navbarReducer,
  authReducer,
});

export default rootReducer;
