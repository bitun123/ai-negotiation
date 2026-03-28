import getAIResponse from "./ai.service.js";
import gameModel from "../model/game.model.js";
import { formatHistory } from "../utils/formatHistory.js";

export const createProcessOffer = ({
  model = gameModel,
  aiResponder = getAIResponse,
  historyFormatter = formatHistory,
} = {}) => async (gameId, offer) => {
  const normalizedOffer = Number(offer);
  if (!Number.isFinite(normalizedOffer) || normalizedOffer < 0) {
    throw new Error("Invalid offer");
  }

  const game = await model.findById(gameId);
  if (!game) throw new Error("Game not found");
  if (game.status === "completed") throw new Error("Game completed");

  const currentRound = game.rounds.length + 1;
  if (currentRound > game.maxRounds) throw new Error("Max rounds reached");

  const { minPrice, initialPrice, difficulty, aiPersonality } = game;
  const targetPrice = Math.round(initialPrice * 0.85);

  const history = historyFormatter(game.rounds.slice(-3));
  const lastCounter = game.rounds.at(-1)?.aiCounter || initialPrice;

  let baseDrop = difficulty === "easy" ? 80 : difficulty === "hard" ? 30 : 50;
  if (aiPersonality === "greedy") baseDrop -= 10;
  if (aiPersonality === "friendly") baseDrop += 10;

  let aiResponse = "";
  let aiCounter = null;
  let action = "negotiate";

  // BELOW MIN
  if (normalizedOffer < minPrice) {
    action = "reject";
    aiResponse = await aiResponder({
      offer: normalizedOffer,
      minPrice,
      initialPrice,
      currentRound,
      maxRounds: game.maxRounds,
      difficulty,
      aiPersonality,
      history,
      action,
    });

    aiCounter = Math.max(minPrice, lastCounter - baseDrop);
  }

  // NEGOTIATE
  else if (normalizedOffer < targetPrice) {
    action = "negotiate";
    aiResponse = await aiResponder({
      offer: normalizedOffer,
      minPrice,
      initialPrice,
      currentRound,
      maxRounds: game.maxRounds,
      difficulty,
      aiPersonality,
      history,
      action,
    });

    aiCounter = Math.max(
      normalizedOffer + 20,
      Math.round(normalizedOffer + (initialPrice - normalizedOffer) * 0.4),
      minPrice
    );
  }

  // ACCEPT offer
  else {
    action = "accept";
    aiResponse = await aiResponder({
      offer: normalizedOffer,
      minPrice,
      initialPrice,
      currentRound,
      maxRounds: game.maxRounds,
      difficulty,
      aiPersonality,
      history,
      action,
    });

    if (difficulty === "hard" && currentRound < game.maxRounds - 1) {
      action = "negotiate";
      aiCounter = Math.max(minPrice, Math.round(normalizedOffer * 1.05));
    } else {
      game.finalPrice = normalizedOffer;
      game.status = "completed";
    }
  }

  // LAST ROUND
  if (currentRound === game.maxRounds && game.status !== "completed") {
    if (normalizedOffer >= minPrice) {
      game.finalPrice = normalizedOffer;
      action = "accept";
      aiResponse = `Fine, deal done at ${normalizedOffer}.`;
    } else {
      action = "reject";
      aiResponse = "No deal.";
    }
    game.status = "completed";
    aiCounter = null;
  }

  game.rounds.push({
    round: currentRound,
    userOffer: normalizedOffer,
    aiResponse,
    aiCounter
  });

  await game.save();
  return game;
};

export const processOffer = createProcessOffer();

