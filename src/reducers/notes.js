import { CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../actions";

let newId = 0;

const initialState = [
  {
    id: newId++,
    title: "A default note",
    text:
      "This is the default note. Some Lorem Ipsum text should be placed here",
    createdAt: new Date(Date.now()),
    modifiedAt: new Date(Date.now())
  },
  {
    id: newId++,
    title: "Aonther note",
    text:
      "getDerivedStateFromProps exists for only one purpose. It enables a component to update its internal state as the result of changes in props. Our previous blog post provided some examples, like recording the current scroll direction based on a changing offset prop or loading external data specified by a source prop.",
    createdAt: new Date(Date.now()),
    modifiedAt: new Date(Date.now())
  }
];

function notes(state = initialState, action) {
  console.log("notes reducer");
  console.log(action);
  switch (action.type) {
    case CREATE_NOTE:
      return [
        ...state,
        {
          id: newId++,
          title: action.payload.title,
          text: action.payload.text,
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
      return state;
    default:
      return state;
  }
}

export default notes;
