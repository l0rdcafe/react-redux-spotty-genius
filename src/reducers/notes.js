import { GET_NOTES_SUCCESS, GET_NOTES_ERROR, GET_SONG_STATS_REQUEST, SIGN_OUT_SUCCESS } from "../actions/shared";

const notes = (state = "", action) => {
  switch (action.type) {
    case GET_NOTES_SUCCESS:
      return action.notes;
    case GET_SONG_STATS_REQUEST:
    case SIGN_OUT_SUCCESS:
    case GET_NOTES_ERROR:
      return "";
    default:
      return state;
  }
};

export default notes;
