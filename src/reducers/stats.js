import { GET_SONG_STATS_SUCCESS, GET_SONG_STATS_ERROR, SIGN_OUT_SUCCESS } from "../actions/shared";

const stats = (state = [], action) => {
  switch (action.type) {
    case GET_SONG_STATS_SUCCESS:
      return action.data;
    case GET_SONG_STATS_ERROR:
    case SIGN_OUT_SUCCESS:
      return "";
    default:
      return state;
  }
};

export default stats;
