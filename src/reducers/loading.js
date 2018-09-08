import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR, GET_PLAYING_ERROR } from "../actions/shared";

const loading = (state = false, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return true;
    case GET_USER_SUCCESS:
    case GET_USER_ERROR:
    case GET_PLAYING_ERROR:
      return false;
    default:
      return state;
  }
};

export default loading;
