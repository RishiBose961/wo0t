import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSelector } from "react-redux";

const GeminiPostCreate = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const apiKey = userInfo?.geminiApiKey;

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const AipostSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  return { AipostSession };
};

export default GeminiPostCreate;
