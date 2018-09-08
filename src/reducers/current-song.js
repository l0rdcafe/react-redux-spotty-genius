import { GET_PLAYING_ERROR, GET_USER_SUCCESS, GET_USER_ERROR, SIGN_OUT_SUCCESS } from "../actions/shared";

const currSong = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        song: action.data.song,
        artist: action.data.artist,
        duration: action.data.duration,
        id: action.data.id,
        isPlaying: action.data.isPlaying
      };
    case SIGN_OUT_SUCCESS:
    case GET_PLAYING_ERROR:
    case GET_USER_ERROR:
      return {};
    default:
      return state;
  }
};

export default currSong;
