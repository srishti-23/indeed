const initialState = { bookmarks: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}