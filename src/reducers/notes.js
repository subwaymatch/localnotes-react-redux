import { CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../actions";

const initialState = [
  {
    id: "a5793e49-5bf2-4ef3-a518-bdab2aadac35",
    title: "A default note",
    text:
      "This is the default note. Some Lorem Ipsum text should be placed here",
    createdAt: new Date(Date.now() - 200000),
    modifiedAt: new Date(Date.now() - 100000)
  },
  {
    id: "055ca611-7efc-4f78-b0fa-5d73b2ab12db",
    title: "Another note",
    text:
      "getDerivedStateFromProps exists for only one purpose. It enables a component to update its internal state as the result of changes in props. Our previous blog post provided some examples, like recording the current scroll direction based on a changing offset prop or loading external data specified by a source prop.",
    createdAt: new Date(Date.now()),
    modifiedAt: new Date(Date.now())
  }
];

function notes(state = initialState, action) {
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
      return state;
    default:
      return state;
  }
}

export default notes;
