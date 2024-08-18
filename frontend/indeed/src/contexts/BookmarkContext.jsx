import React, { createContext, useReducer } from "react";

const initialState = { bookmarks: [] };

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_BOOKMARK":
      const isBookmarked = state.bookmarks.some(
        (bookmark) => bookmark.id === action.payload.id
      );
      return {
        ...state,
        bookmarks: isBookmarked
          ? state.bookmarks.filter(
              (bookmark) => bookmark.id !== action.payload.id
            )
          : [...state.bookmarks, action.payload],
      };
    default:
      return state;
  }
}

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookmarksContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarksContext.Provider>
  );
};
