import { SET_CURRENT_NOTE } from "../actions";

const initialState = null;

function currentNote(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_NOTE:
      return action.payload;
    default:
      return state;
  }
}

export default currentNote;
