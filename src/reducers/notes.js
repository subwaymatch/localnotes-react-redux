import { CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../actions";
import notesData from "../data/notes-demo-data";

function notes(state = notesData, action) {
  switch (action.type) {
    case CREATE_NOTE:
      return [
        ...state,
        {
          id: action.payload,
          title: "",
          text: "",
          createdAt: new Date(Date.now()),
          modifiedAt: new Date(Date.now())
        }
      ];
    case UPDATE_NOTE:
      return state.map(item => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.text = action.payload.text;
          item.modifiedAt = new Date(Date.now());
        }

        return item;
      });
    case DELETE_NOTE:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
}

export default notes;
