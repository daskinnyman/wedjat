import React from "react";
import "./PageDataDisplay.css";

interface PageDataDisplayProps {
  pageUrl: string;
  selectionText: string;
  answer: string;
  onSendQuery: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const PageDataDisplay: React.FC<PageDataDisplayProps> = ({
  pageUrl,
  selectionText,
  answer,
  onSendQuery,
  isLoading,
  error,
}) => {
  const handleQuery = () => {
    onSendQuery();
  };

  const hasSelection = selectionText.trim().length > 0;

  return (
    <div className="page-data-display">
      <h3>wedjat</h3>

      <div className="button-container">
        <button onClick={handleQuery} disabled={isLoading}>
          {isLoading ? "Processing..." : "Check Selection"}
        </button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="content-section">
        <strong>URL:</strong> {pageUrl || "—"}
        <br />
        <strong>Selection:</strong>
        <div className="content-box">
          {hasSelection ? selectionText : "(No selection or empty)"}
        </div>
        <div id="answer" className="answer-section">
          <strong>Answer:</strong>
          <div className="content-box">{answer || "(Not generated yet)"}</div>
        </div>
      </div>
    </div>
  );
};
