import { GET_NOTES_REQUEST, GET_NOTES_SUCCESS, GET_NOTES_ERROR } from "../actions/shared";

const loadingNotes = (state = false, action) => {
  switch (action.type) {
    case GET_NOTES_REQUEST:
      return true;
    case GET_NOTES_SUCCESS:
    case GET_NOTES_ERROR:
      return false;
    default:
      return state;
  }
};

export default loadingNotes;
