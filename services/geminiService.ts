import { GoogleGenAI } from "@google/genai";
import { AssetType } from '../types';

// Per coding guidelines, the API key is assumed to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAssetDescription = async (assetName: string, assetType: AssetType): Promise<string> => {
  // The 'ai' instance is now guaranteed to be initialized.
  try {
    const prompt = `Generate a concise, professional asset description for a company inventory system. The asset is a ${assetType} named "${assetName}". Focus on key identifying features or common use cases. Keep it to one or two sentences.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating asset description:", error);
    return "Failed to generate description due to an error.";
  }
};
