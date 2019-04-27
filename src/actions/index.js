export const CREATE_NOTE = "CREATE_NOTE";

export const createNote = (title, text) => ({
  type: CREATE_NOTE,
  payload: {
    title,
    text
  }
});

export const DELETE_NOTE = "DELETE_NOTE";

export const deleteNote = id => ({
  type: DELETE_NOTE,
  payload: id
});

export const UPDATE_NOTE = "UPDATE_NOTE";

export const updateNote = (id, title, text) => ({
  type: UPDATE_NOTE,
  payload: {
    id,
    title,
    text
  }
});

export const SET_CURRENT_NOTE = "SET_CURRENT_NOTE";

export const setCurrentNote = note => ({
  type: SET_CURRENT_NOTE,
  payload: note
});
