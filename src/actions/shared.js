import { getUserInfo, getSongStats, getCurrentlyPlaying } from "../api/spotify-api";
import getAnnotations from "../api/genius-api";
import getSongLyrics from "../api/musixmatch-api";
import { sleep, convertMillisToMinsSecs } from "../constants/utils";

const GET_USER_REQUEST = "GET_USER_REQUEST";
const GET_USER_SUCCESS = "GET_USER_SUCCESS";
const GET_USER_ERROR = "GET_USER_ERROR";
const GET_PLAYING_REQUEST = "GET_LYRICS_REQUEST";
const GET_PLAYING_ERROR = "GET_PLAYING_ERROR";
const GET_SONG_STATS_REQUEST = "GET_SONG_STATS_REQUEST";
const GET_SONG_STATS_SUCCESS = "GET_SONG_STATS_SUCCESS";
const GET_SONG_STATS_ERROR = "GET_SONG_STATS_ERROR";
const GET_NOTES_REQUEST = "GET_NOTES_REQUEST";
const GET_NOTES_SUCCESS = "GET_NOTES_SUCCESS";
const GET_NOTES_ERROR = "GET_NOTES_ERROR";
const GET_LYRICS_REQUEST = "GET_LYRICS_REQUEST";
const GET_LYRICS_SUCCESS = "GET_LYRICS_SUCCESS";
const GET_LYRICS_ERROR = "GET_LYRICS_ERROR";
const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
const SIGN_IN_ERROR = "SIGN_IN_ERROR";
const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";

const getUserRequest = () => ({ type: GET_USER_REQUEST });

const getUserSuccess = data => ({ type: GET_USER_SUCCESS, data });

const getUserError = error => ({ type: GET_USER_ERROR, error });

const getSongStatsRequest = () => ({ type: GET_SONG_STATS_REQUEST });

const getSongStatsSuccess = data => ({ type: GET_SONG_STATS_SUCCESS, data });

const getSongStatsError = error => ({ type: GET_SONG_STATS_ERROR, error });

const getSongInfo = (id, options) => dispatch => {
  dispatch(getSongStatsRequest());
  getSongStats(id, options)
    .then(data => dispatch(getSongStatsSuccess(data)))
    .catch(e => dispatch(getSongStatsError(e)));
};

const getUser = options => dispatch => {
  dispatch(getUserRequest());
  getUserInfo(options)
    .then(res => {
      const { data } = res;
      if (res.error) {
        dispatch(getUserError(res.error));
      }

      dispatch(getUserSuccess(data));

      if (data.isPlaying) {
        dispatch(getSongInfo(data.id, options));
      }
    })
    .catch(e => dispatch(getUserError(e)));
};

const getNotesRequest = () => ({ type: GET_NOTES_REQUEST });

const getNotesSuccess = notes => ({ type: GET_NOTES_SUCCESS, notes });

const getNotesError = error => ({ type: GET_NOTES_ERROR, error });

const getNotes = currSong => dispatch => {
  dispatch(getNotesRequest());
  getAnnotations(currSong)
    .then(data => dispatch(getNotesSuccess(data)))
    .catch(err => dispatch(getNotesError(err)));
};

const getLyricsRequest = () => ({ type: GET_LYRICS_REQUEST });

const getLyricsSuccess = lyrics => ({ type: GET_LYRICS_SUCCESS, lyrics });

const getLyricsError = error => ({ type: GET_LYRICS_ERROR, error });

const getLyrics = currSong => dispatch => {
  dispatch(getLyricsRequest());
  getSongLyrics(currSong)
    .then(data => dispatch(getLyricsSuccess(data)))
    .catch(err => dispatch(getLyricsError(err)));
};

const signInSuccess = () => ({ type: SIGN_IN_SUCCESS });

const signInError = error => ({ type: SIGN_IN_ERROR, error });

const signOutSuccess = () => ({ type: SIGN_OUT_SUCCESS });

const pollSong = options => async (dispatch, getState) => {
  while (true) {
    try {
      const result = await getCurrentlyPlaying(options);
      const state = getState();
      const { id } = state.currSong;
      const { id: resId } = result.item;

      const res = {
        id: resId,
        song: result.item.name,
        isPlaying: result.is_playing,
        artist: result.item.artists[0].name,
        duration: convertMillisToMinsSecs(result.item.duration_ms),
        name: state.user
      };

      dispatch(getUserSuccess(res));

      if (id !== resId) {
        dispatch(getSongInfo(resId, options));
      }
    } catch (e) {
      dispatch(getUserError(e));
    }
    await sleep(5000);
  }
};

export {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_PLAYING_REQUEST,
  GET_PLAYING_ERROR,
  GET_SONG_STATS_REQUEST,
  GET_SONG_STATS_SUCCESS,
  GET_SONG_STATS_ERROR,
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  GET_LYRICS_REQUEST,
  GET_LYRICS_SUCCESS,
  GET_LYRICS_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_IN_ERROR,
  getUser,
  getNotes,
  getLyrics,
  signInSuccess,
  signInError,
  signOutSuccess,
  pollSong
};
