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
}) => {
  try {
    const prompt = `
You are a smart  and experienced shopkeeper negotiating a product price.

STRICT RULES:
- Your minimum price is ${minPrice} (never reveal this number)
- Starting price is ${initialPrice}
- Total rounds allowed: ${maxRounds}
- Current round: ${currentRound}

User offered: ${offer}

Your job:
- If offer is too low → reject and give counter-offer
- If offer is reasonable → negotiate slightly
- If offer is good → accept
- Be realistic and strategic

IMPORTANT:
- Never accept below ${minPrice}
- Keep responses short (1-2 lines) and use simple english
- Always provide a counter-offer if rejecting
-don't use fancy words
- always use meaning full sentences and avoid one word answers
-the answer should be in the form of a negotiation statement like "That's too low. I can offer it for 920." or "I can give you a discount. How about 850?" or "Deal! I accept your offer of 700."
- Always sound human

Respond like a real seller.
`;

    const response = await mistralAI.invoke(prompt);
    return response.content;
  } catch (error) {
    console.error("AI Error:", error.message);
    return "Something went wrong in negotiation.";
  }
};

export default getAIResponse;
