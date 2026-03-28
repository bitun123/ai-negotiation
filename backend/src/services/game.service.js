import getAIResponse from "./ai.service.js";
import gameModel from "../model/game.model.js";

export const processOffer = async (gameId, gameId) => {
  try {
    const game = await gameModel.findById(gameId);

    if (!game) {
      throw new Error("Game not found");
    }
    if (game.status === "completed") throw new Error("Game already completed");

    const currentRound = game.rounds.length + 1;

    if (currentRound > game.maxRounds) {
      throw new Error("Max rounds reached");
    }

    let aiResponse = "";
    let aiCounter = null;

    // 🧠 CASE 1: Offer BELOW min price → AI handles tone, NOT decision

    if (offer < game.minPrice) {
      aiResponse = await getAIResponse({
        offer,
        minPrice: game.minPrice,
        initialPrice: game.initialPrice,
        currentRound,
        maxRounds: game.maxRounds,
      });
      aiCounter = Math.max(
        game.minPrice,
        game.initialPrice - currentRound * 50,
      );
    }
    // 🧠 CASE 2: Offer >= min price → ACCEPT (AI cannot override)
    else {
      aiResponse = "Alright, deal accepted!";
      game.finalPrice = offer;
      game.status = "completed";
    }

    // ⏱️ CASE 3: Last round and still not accepted

    if (currentRound === game.maxRounds && aiCounter !== null) {
      aiResponse += " This is my final offer.";
      aiResponse = "Negotiation ended. No deal.";
      game.status = "completed";
    }

    game.rounds.push({
      round: currentRound,
      userOffer: offer,
      aiResponse,
      aiCounter,
    });

    await game.save();

    return game;
  } catch (error) {
    console.error("Game Service Error:", error.message);
    throw new Error("Failed to process offer");
  }
};
