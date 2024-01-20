import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyBAnp99e8fqIiPNK2it8htZnq9oFsKqpb8";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const PROMPT =
  "For the given text below, summarize the main topics in just a single paragraph";

const PROMPT_POINTS =
  "For the given text below, summarize the idea in few points";

const getSummary = async (selectionText) => {
  const result = await model.generateContent(`${PROMPT} "${selectionText}"`);

  const response = await result.response;
  const text = response.text();

  return text;
};

export { getSummary };
