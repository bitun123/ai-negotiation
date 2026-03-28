import dotenv from "dotenv";
dotenv.config();
import { ChatMistralAI } from "@langchain/mistralai";

const mistralAI = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small-latest",
  temperature: 0.7,
});



const getAIResponse = async ({
  offer,
  minPrice,
  initialPrice,
  currentRound,
  maxRounds,
  difficulty,
  aiPersonality,
  history,
  action = "negotiate"
}) => {
  try {
    const prompt = `
You are a real human shopkeeper negotiating a product price.

CONTEXT:
- Starting price: ${initialPrice}
- Your hidden minimum price: ${minPrice}
- Current round: ${currentRound} of ${maxRounds}
- Customer offer: ${offer}
- Difficulty level: ${difficulty}
- Your personality: ${aiPersonality}
- Previous negotiation: ${history}
- Required action for this turn: ${action}

YOUR BEHAVIOR:
- Speak like a real human seller (natural, casual tone)
- Do NOT repeat fixed phrases or templates
- Vary your sentences every time
- Keep it short (1-2 lines max)

NEGOTIATION RULES:
- Never accept below your minimum price
- Follow the required action exactly: reject, negotiate, or accept
- If offer is very low → reject firmly and give a higher counter
- If offer is close → negotiate politely
- If offer is good → accept naturally

STYLE:
- Use simple English
- Avoid robotic or repeated patterns
- Sound slightly emotional or persuasive if needed
- You can show hesitation, pressure, or friendliness

IMPORTANT:
- Do NOT reveal your minimum price
- Always move the negotiation forward (counter or accept)
- Keep the reply under 2 short lines

Respond like a real shopkeeper in a live negotiation.
`;

    const response = await mistralAI.invoke(prompt);
    return response.content;
  } catch (error) {
    console.error("AI Error:", error.message);
    if (action === "reject") return "That offer is too low, I can't do that price.";
    if (action === "accept") return "Alright, we have a deal.";
    return "You're close, but I need a better offer.";
  }
};



export default getAIResponse;
