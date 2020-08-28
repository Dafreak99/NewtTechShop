import axios from "axios";
import { toast } from "react-toastify";
import setAuthToken from "../../utils/AuthorizationHeader";
import { loadCart } from ".";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN = "LOGIN";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const CLEAR_PROFILE = "CLEAR_PROFILE";

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.authToken) {
    setAuthToken(localStorage.authToken);
  }
  try {
    const res = await axios({
      method: "GET",
      url: "/user/info",
      withCredentials: true,
    });

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    const body = JSON.stringify({ name, email, password });

    const respond = await axios({
      url: "/api/users",
      method: "POST",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: respond.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.respond.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    // }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user

export const login = (username, password, history) => async (dispatch) => {
  try {
    const body = JSON.stringify({ username, password });
    const respond = await axios({
      url: "/user/signin",
      method: "POST",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    toast.success("Login successful");

    // Set Auth token
    localStorage.setItem("authToken", respond.data.token);
    dispatch(loadCart());
    dispatch({ type: "LOGIN", payload: respond.data });
    history.push("/");
  } catch (error) {
    const errors = error.response.data.error;
    if (errors) {
      toast.error(errors[0]);
    }
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("authToken");
  dispatch({ type: LOGOUT });
  toast.success("Logged out");
};
