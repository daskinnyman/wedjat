/**
 * Gets the currently selected text from the window
 * @returns The selected text or empty string if nothing is selected
 */
export const getSelectionText = (): string => {
  return window.getSelection()?.toString() ?? "";
};

/**
 * Gets the current page URL
 * @returns The current page URL
 */
export const getCurrentPageUrl = (): string => {
  return location.href;
};
