import { SIGN_IN_ERROR, SIGN_OUT_SUCCESS } from "../actions/shared";
import { SET_TOKEN } from "../actions/token";

const token = (state = "", action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.token;
    case SIGN_IN_ERROR:
    case SIGN_OUT_SUCCESS:
      return "";
    default:
      return state;
  }
};

export default token;
