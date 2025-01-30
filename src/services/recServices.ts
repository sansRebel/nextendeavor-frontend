import apiClient from "./apiClient";
import { Recommendation } from "@/types";

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

