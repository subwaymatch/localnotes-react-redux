import { CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../actions";
import notesData from "../data/notes-demo-data";

function loadNotes() {
  let loadedNotes = localStorage.getItem("notes");
  if (loadedNotes === null) {
    return notesData;
  } else {
    return JSON.parse(loadedNotes);
  }
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function notes(state = loadNotes(), action) {
  let modifiedNotes;

  switch (action.type) {
    case CREATE_NOTE:
      modifiedNotes = [
        ...state,
        {
          id: action.payload,
          title: "",
          text: "",
          createdAt: new Date(Date.now()),
          modifiedAt: new Date(Date.now())
        }
      ];

      saveNotes(modifiedNotes);

      return modifiedNotes;
    case UPDATE_NOTE:
      modifiedNotes = state.map(item => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.text = action.payload.text;
          item.modifiedAt = new Date(Date.now());
        }

        return item;
      });

      saveNotes(modifiedNotes);

      return modifiedNotes;
    case DELETE_NOTE:
      modifiedNotes = state.filter(item => item.id !== action.payload);

      saveNotes(modifiedNotes);

      return modifiedNotes;
    default:
      return state;
  }
}

export default notes;
