const INITIAL_STATE = {
  rootFolders: [],
  folders: [],
  bookmarks: [],
  dashboardVisibility: { width: "0" },
  shortcuts: []
}

function bbReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPDATE_FOLDER":
      return {
        ...state,
        rootFolders: state.rootFolders.map(folder => {
          if (folder.id !== action.item.id) {
            return folder;
          }

          return action.item;
        })
      };
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
    case "ADD_SHORTCUT":
      return {
        ...state,
        shortcuts: [ ...state.shortcuts, action.item ]
      };
    case "TOGGLE_DASHBOARD":
      if (state.dashboardVisibility.width === "0")
        return {
          ...state,
          dashboardVisibility: { 
            animation: "0.5s slide-dashboard",
            width: "30vw"
          }
        };
      else
        return {
          ...state,
          dashboardVisibility: { 
            animation: "0.5s slide-dashboard-back",
            width: "0"
          }
        };
    default:    
      return state;
  }
}

export default bbReducer;