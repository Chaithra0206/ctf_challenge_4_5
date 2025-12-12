import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePotionDescription(ingredients: string[]): Promise<string> {
  try {
    const prompt = `
      You are a master alchemist in a high-fantasy setting.
      A user has mixed the following ingredients into a cauldron: ${ingredients.join(', ')}.
      
      Generate a short, mystical, and slightly cryptic description (max 2 sentences) of the resulting potion or effect.
      Focus on the visual, olfactory, or magical properties.
      If the mix sounds dangerous, describe a volatile reaction.
      If it sounds pleasant, describe a glowing elixir.
      
      Do not start with "The potion is..." or "You have created...". Jump straight into the description.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "The mixture swirls ominously, but nothing happens.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The magical energies are too chaotic to discern a result right now.";
  }
}