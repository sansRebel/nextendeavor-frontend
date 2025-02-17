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

  

export const fetchSavedRecommendations = async (): Promise<Recommendation[]> => {
  const res = await apiClient.get<{ recommendations: Recommendation[] }>("/api/recommendations/saved");
  return res.data.recommendations; 
};


export const saveRecommendation = async(careerId: string) => {
  try {
    const res = await apiClient.post("/api/recommendations/save", { careerId });

    return res.data; 
  } catch (error) {
    console.error("Failed to save recommendation:", error);
    throw error; 
  }
};


export const clearSavedRecommendations = async () => {
    await apiClient.delete("/api/recommendations/clear");
}

export const fetchCareerDetails = async (careerId: string): Promise<Recommendation> => {
  if (!careerId) {
    throw new Error("Invalid career ID");
  }

  console.log(`Fetching career details for ID: ${careerId}`); // ✅ Log the ID

  try {
    const response = await apiClient.get(`/api/recommendations/career/${careerId}`);
    console.log("Career details fetched successfully:", response.data); // ✅ Log API response
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error fetching career details for ID ${careerId}:`, error?.response?.data || error);
    throw new Error("Career not found or API request failed");
  }
};

