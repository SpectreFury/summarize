/*global chrome*/
import React, { useState, useEffect } from "react";
import { getSummary } from "./utils/gemini-api";
import { Flex, Button, Spinner } from "@chakra-ui/react";
import { useSummaryStore } from "./store/summaryStore";

function App() {
  const [loading, setLoading] = useState();

  const summarizeText = async () => {
    setLoading(true);
    const text = await navigator.clipboard.readText();

    const summarizedText = await getSummary(text);
    setSummary(summarizedText);
    localStorage.setItem("summaryText", JSON.stringify(summarizedText));
    setLoading(false);
  };
  const { summary, setSummary } = useSummaryStore();
  useEffect(() => {
    const previousText = localStorage.getItem("summaryText");

    if (previousText) {
      setSummary(JSON.parse(previousText));
    }
    chrome.contextMenus.create({
      id: "summarize",
      title: "Summarize the selected text using the API",
      contexts: ["selection"],
    });

    chrome.contextMenus.onClicked.addListener(async (selected) => {
      const text = await getSummary(selected.selectionText);
      localStorage.setItem("summaryText", JSON.stringify(text));
      setSummary(text);
    });
  }, []);

  return (
    <main className="min-w-[400px] min-h-[600px]">
      <nav className="flex justify-center items-center p-2 border-b">
        <div className="text-lg font-bold">Summarize</div>
      </nav>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <Button onClick={summarizeText} isLoading={loading} mb={2}>
          Summarize Clipboard
        </Button>
        {loading ? (
          <Spinner />
        ) : (
          <div className="text-lg p-2 font-medium">{summary}</div>
        )}
      </Flex>
    </main>
  );
}
export default App;
