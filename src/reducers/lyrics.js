import { GET_LYRICS_SUCCESS, GET_LYRICS_ERROR, GET_SONG_STATS_REQUEST } from "../actions/shared";

const lyrics = (state = "", action) => {
  switch (action.type) {
    case GET_LYRICS_SUCCESS:
      return action.lyrics;
    case GET_SONG_STATS_REQUEST:
    case GET_LYRICS_ERROR:
      return "";
    default:
      return state;
  }
};

export default lyrics;
