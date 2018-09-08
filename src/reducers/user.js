import { GET_USER_SUCCESS, GET_USER_ERROR } from "../actions/shared";

const user = (state = "", action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.data.name;
    case GET_USER_ERROR:
      return "";
    default:
      return state;
  }
};

export default user;
