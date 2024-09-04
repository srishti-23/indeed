import React, { createContext, useReducer, useEffect } from "react";
import axios from 'axios';

const initialState = { bookmarks: [] };

function reducer(state, action) {
  switch (action.type) {
    case "SET_BOOKMARKS":
      return { ...state, bookmarks: action.payload };

    case "ADD_BOOKMARK":
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };

    case "REMOVE_BOOKMARK":
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

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch bookmarks when the provider mounts
  useEffect(() => {
    async function fetchBookmarks() {
      try {
        const response = await axios.get('http://localhost:8080/api/bookmark/details', { withCredentials: true });
        dispatch({ type: "SET_BOOKMARKS", payload: response.data });
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    }

    fetchBookmarks();
  }, []);

  return (
    <BookmarksContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarksContext.Provider>
  );
};
