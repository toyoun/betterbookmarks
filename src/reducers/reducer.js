const INITIAL_STATE = {
  rootFolders: [],
  folders: [],
  bookmarks: []
}

function bbReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_ROOT_FOLDER":
      return {
        ...state,
        rootFolders: [ ...state.rootFolders, action.item ]
      };
    case "ADD_FOLDER":
      return {
        ...state,
        folders: [ ...state.folders, action.item ]
      };
    case "ADD_BOOKMARK":
      return {
        ...state,
        bookmarks: [ ...state.bookmarks, action.item ]
      };
    default:
      return state;
  }
}

export default bbReducer;