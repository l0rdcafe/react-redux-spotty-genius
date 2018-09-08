import { GET_LYRICS_REQUEST, GET_LYRICS_SUCCESS, GET_LYRICS_ERROR } from "../actions/shared";

const loadingLyrics = (state = false, action) => {
  switch (action.type) {
    case GET_LYRICS_REQUEST:
      return true;
    case GET_LYRICS_SUCCESS:
    case GET_LYRICS_ERROR:
      return false;
    default:
      return state;
  }
};

export default loadingLyrics;
