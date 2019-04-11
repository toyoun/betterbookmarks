const INITIAL_STATE = {
  container: []
}

function bbReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_FOLDER":
    case "ADD_BOOKMARK":
      return {
        ...state,
        container: [ ...state.container, action.item ]
      };
    default:
      return state;
  }
}

export default bbReducer;