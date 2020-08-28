import { LOGOUT, LOGIN, USER_LOADED } from "../actions/Auth";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case USER_LOADED:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};
export default reducer;
