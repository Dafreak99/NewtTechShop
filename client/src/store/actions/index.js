import axios from "axios";
export const LOAD_DATA = "LOAD_DATA";
export const LOAD_CART = "LOAD_CART";
export const ON_SEARCH = "ON_SEARCH";
export const LOGOUT = "LOGOUT";
export const ON_CHANGE_CART_ITEM_QUANTITY = "ON_CHANGE_CART_ITEM_QUANTITY";
export const LOGIN = "LOGIN";
export const ADD_TO_CART = "ADD_TO_CART";
export const NOTIFY = "NOTIFY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REVIEW_MESSAGE = "REVIEW_MESSAGE";
export const GET_DETAIL_ITEM = "GET_DETAIL_ITEM";

export const loadData = () => async (dispatch) => {
  try {
    let res = await axios("/products");

    dispatch({
      type: LOAD_DATA,
      content: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadCart = () => async (dispatch) => {
  try {
    let res = await axios("/info/cart");
    dispatch({
      type: LOAD_CART,
      cart: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export function onSearch(value) {
  return {
    type: ON_SEARCH,
    value,
  };
}

export function logoutSuccess(data) {
  console.log("logoutSuccess");
  return {
    type: LOGOUT,
    data,
  };
}

export function onChangeCartItemQuantity(value, id) {
  return {
    type: ON_CHANGE_CART_ITEM_QUANTITY,
    value,
    id,
  };
}

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    item,
  };
}

export function removeFromCartSuccess(item) {
  return {
    type: REMOVE_FROM_CART,
    item,
  };
}

export function removeFromCart(id) {
  return (dispatch) => {
    axios.get(`/removefromcart/${id}`).then((res) => {
      console.log(res.data);
      dispatch(removeFromCartSuccess(res.data));
    });
  };
}

export function reviewMessage() {
  return {
    type: REVIEW_MESSAGE,
  };
}

export function getDetailItem(matchedItem) {
  return {
    type: GET_DETAIL_ITEM,
    matchedItem,
  };
}
