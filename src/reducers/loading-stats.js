import { GET_SONG_STATS_REQUEST, GET_SONG_STATS_SUCCESS, GET_SONG_STATS_ERROR } from "../actions/shared";

const loadingNotes = (state = false, action) => {
  switch (action.type) {
    case GET_SONG_STATS_REQUEST:
      return true;
    case GET_SONG_STATS_SUCCESS:
    case GET_SONG_STATS_ERROR:
      return false;
    default:
      return state;
  }
};

export default loadingNotes;
