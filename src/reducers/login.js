import { GET_USER_SUCCESS, GET_USER_ERROR, SIGN_OUT_SUCCESS } from "../actions/shared";

const login = (state = false, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return true;
    case GET_USER_ERROR:
    case SIGN_OUT_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default login;
