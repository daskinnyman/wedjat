import { useReducer, useState } from "react";
import { QueryRequest } from "shared/types/query";
import { useSendQuery } from "./useQueryApi";

// Define state types
interface PageDataState {
  pageUrl: string;
  selectionText: string;
}

// Define action types
type PageDataAction =
  | { type: "SET_PAGE_URL"; payload: string }
  | { type: "SET_SELECTION_TEXT"; payload: string };

// Initial state
const initialState: PageDataState = {
  pageUrl: "",
  selectionText: "",
};

// Reducer function
const pageDataReducer = (
  state: PageDataState,
  action: PageDataAction
): PageDataState => {
  switch (action.type) {
    case "SET_PAGE_URL":
      return { ...state, pageUrl: action.payload };
    case "SET_SELECTION_TEXT":
      return { ...state, selectionText: action.payload };
    default:
      return state;
  }
};

export const usePageData = () => {
  const [state, dispatch] = useReducer(pageDataReducer, initialState);
  const [answer, setAnswer] = useState<string>("");

  // Use TanStack Query mutation
  const { mutate: sendQueryMutation, isPending, error } = useSendQuery();

  const sendQuery = async () => {
    try {
      // Check if chrome API is available
      if (typeof chrome === "undefined") {
        throw new Error(
          "Chrome extension APIs not available - not running in extension context"
        );
      }

      if (!chrome.tabs || !chrome.runtime) {
        throw new Error(
          "Chrome extension APIs not available - missing tabs or runtime"
        );
      }

      // Get current tab
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab.id) {
        throw new Error("No active tab found");
      }

      // Get current page data from content script
      const pageDataResponse = await chrome.tabs.sendMessage(tab.id, {
        type: "GET_SELECTION",
      });

      if (pageDataResponse) {
        dispatch({
          type: "SET_PAGE_URL",
          payload: pageDataResponse.pageUrl || "",
        });
        dispatch({
          type: "SET_SELECTION_TEXT",
          payload: pageDataResponse.selectionText || "",
        });
      }

      const selectionText = pageDataResponse?.selectionText || "";

      if (!selectionText) {
        throw new Error("No selection text available");
      }

      const queryRequest: QueryRequest = {
        question: selectionText,
        pageUrl: pageDataResponse?.pageUrl || "",
        selectionText: selectionText,
      };

      // Use TanStack Query mutation
      sendQueryMutation(queryRequest, {
        onSuccess: (response) => {
          setAnswer(response.answer);
        },
        onError: (error) => {
          console.error("Query error:", error);
          setAnswer("Error: Unable to send query");
        },
      });
    } catch (error) {
      console.error("Error in sendQuery:", error);
      setAnswer("Error: Unable to connect to background script");
    }
  };

  return {
    ...state,
    answer,
    sendQuery,
    isLoading: isPending,
    error: error?.message || null,
  };
};
