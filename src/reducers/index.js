import { combineReducers } from "redux";
import login from "./login";
import loading from "./loading";
import token from "./token";
import user from "./user";
import error from "./error";
import currSong from "./current-song";
import stats from "./stats";
import loadingStats from "./loading-stats";
import loadingNotes from "./loading-notes";
import loadingLyrics from "./loading-lyrics";
import notes from "./notes";
import lyrics from "./lyrics";

export default combineReducers({
  loading,
  loadingStats,
  loadingNotes,
  loadingLyrics,
  login,
  token,
  user,
  currSong,
  stats,
  notes,
  lyrics,
  error
});
