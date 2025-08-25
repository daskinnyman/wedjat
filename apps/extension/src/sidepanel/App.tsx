import { PageDataDisplay } from "@/components/PageDataDisplay";
import { usePageData } from "@/hooks/usePageData";

export default function App() {
  const { pageUrl, selectionText, answer, sendQuery, isLoading, error } =
    usePageData();

  return (
    <PageDataDisplay
      pageUrl={pageUrl}
      selectionText={selectionText}
      answer={answer}
      onSendQuery={sendQuery}
      isLoading={isLoading}
      error={error}
    />
  );
}
