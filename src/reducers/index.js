import { combineReducers } from "redux";

import notes from "./notes";
import currentNote from "./currentNote";

const rootReducer = combineReducers({
  notes,
  currentNote
});

export default rootReducer;
