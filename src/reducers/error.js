import {
  GET_USER_ERROR,
  GET_NOTES_ERROR,
  GET_SONG_STATS_ERROR,
  GET_LYRICS_ERROR,
  GET_PLAYING_ERROR,
  GET_USER_SUCCESS,
  SIGN_OUT_SUCCESS
} from "../actions/shared";

const error = (state = "", action) => {
  switch (action.type) {
    case GET_USER_ERROR:
      return {
        error: action.error,
        user: true
      };
    case GET_NOTES_ERROR:
      return {
        error: action.error,
        notes: true
      };
    case GET_SONG_STATS_ERROR:
      return {
        error: action.error,
        stats: true
      };
    case GET_LYRICS_ERROR:
      return {
        error: action.error,
        lyrics: true
      };
    case GET_PLAYING_ERROR:
      return {
        error: action.error,
        playing: true
      };
    case GET_USER_SUCCESS:
    case SIGN_OUT_SUCCESS:
      return "";
    default:
      return state;
  }
};

export default error;
