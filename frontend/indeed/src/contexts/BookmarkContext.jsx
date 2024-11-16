import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = { bookmarks: [] };

function reducer(state, action) {
  switch (action.type) {
    case "SET_BOOKMARKS":
      return { ...state, bookmarks: action.payload || [] };

    // case "ADD_BOOKMARK":
    //   return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case "ADD_BOOKMARK":
      console.log(
        "Current bookmarks:",
        state.bookmarks,
        "New bookmark:",
        action.payload
      );
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };

    // case "REMOVE_BOOKMARK":
    //   return {
    //     ...state,
    //     bookmarks: state.bookmarks.filter(
    //       (bookmark) => bookmark.id !== action.payload.id
    //     ),
    //   };
    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark._id !== action.payload._id
        ),
      };

    // case "TOGGLE_BOOKMARK":
    //   const isBookmarked = state.bookmarks.some(
    //     (bookmark) => bookmark.id === action.payload.id
    //   );
    //   if (isBookmarked) {
    //     return {
    //       ...state,
    //       bookmarks: state.bookmarks.filter(
    //         (bookmark) => bookmark.id !== action.payload.id
    //       ),
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       bookmarks: [...state.bookmarks, action.payload],
    //     };
    //   }
    case "TOGGLE_BOOKMARK":
      const isBookmarked = state.bookmarks.some(
        (bookmark) => bookmark._id === action.payload._id
      );
      if (isBookmarked) {
        return {
          ...state,
          bookmarks: state.bookmarks.filter(
            (bookmark) => bookmark._id !== action.payload._id
          ),
        };
      } else {
        return {
          ...state,
          bookmarks: [...state.bookmarks, action.payload],
        };
      }

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
        const response = await axios.get(
          "https://localhost:8080/api/bookmark/details",
          { withCredentials: true }
        );
        console.log("response.data", response.data);

        dispatch({ type: "SET_BOOKMARKS", payload: response.data });
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    }

    fetchBookmarks();
  }, []);

  return (
    <BookmarksContext.Provider
      value={{ state,dispatch}}
    >
      {children}
    </BookmarksContext.Provider>
  );
};
