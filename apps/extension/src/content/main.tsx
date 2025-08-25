import { getSelectionText, getCurrentPageUrl } from "./utils/selection.ts";

const initializeMessageListener = (): void => {
  chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
    if (msg.type === "GET_SELECTION") {
      sendResponse({
        selectionText: getSelectionText(),
        pageUrl: getCurrentPageUrl(),
      });
    }
  });
};

console.log("[CRXJS] Hello world from content script!");

initializeMessageListener();
