// Background script - Simplified version
// Currently mainly used for handling extension lifecycle events

console.log("Background script initialized");

// Listen for extension installation events
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Listen for extension startup events
chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started");
});

// Keep basic message listener for future extensibility
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log("Background script received message:", message);

  // Currently no message types need background script processing
  // All API calls are performed directly in the frontend
  sendResponse({
    success: false,
    error: "No message handlers configured in background script",
  });
});
