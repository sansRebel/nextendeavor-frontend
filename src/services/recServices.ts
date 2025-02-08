import apiClient from "./apiClient";
import { Recommendation } from "@/types";


export const sendMessageToDialogflow = async (message: string) => {
  try {
    const response = await apiClient.post("/api/dialogflow/webhook", {
      message, // Send only the user message
      sessionId: "unique-session-id-123", // Optional for context tracking
    });

    console.log("✅ API Response:", response.data);

    return {
      text: response.data.fulfillmentText,
      intent: response.data.intent,
      parameters: response.data.parameters,
      recommendations: response.data.recommendations || [] // Ensure recommendations are handled
    };
  } catch (error) {
    console.error("❌ Error connecting to chatbot:", error);
    return { text: "Something went wrong. Please try again.", intent: "", parameters: {}, recommendations: [] };
  }
};

  

export const fetchRecommendation = async (): Promise<Recommendation[]> => {
    const res = await apiClient.get<Recommendation[]>("/recommendations/saved");
    return res.data;
}

export const saveRecommendation = async(recommendationId: string) => {
    const res = await apiClient.post("/recommendations/save", { id: recommendationId });
    return res.data

}


export const deleteRecommendations = async () => {
    await apiClient.delete("recommendations/clear");
}

