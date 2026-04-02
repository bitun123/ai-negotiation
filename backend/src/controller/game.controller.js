import gameModel from "../model/game.model.js";
import { processOffer } from "../services/game.service.js";
import generateProduct from "../utils/generateProduct.js";
import { calculateNegotiationScore } from "../utils/calculateNegotiationScore.js";

export const createGameController = async (req, res) => {
  try {
    const userId = req.user?.id;

    const { selectedProduct, selectedDifficulty } = req.body;

    const productData = generateProduct(selectedProduct, selectedDifficulty);

    const newGame = await gameModel.create({
      userId,
      product: productData.product,
      initialPrice: productData.initialPrice,
      minPrice: productData.minPrice,
      difficulty: productData.difficulty,
      aiPersonality: productData.aiPersonality,
    });

    res.status(201).json({
      success: true,
      message: "Game started successfully",
      data: {
        id: newGame._id,
        product: newGame.product,
        initialPrice: newGame.initialPrice,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const makeOfferController = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { offer, userMessage } = req.body;
    if (offer === undefined) {
      return res.status(400).json({ error: "Offer is required" });
    }

    const game = await processOffer(gameId, offer, userMessage);

    const lastRound = game.rounds.at(-1);

    if (game.status === "completed") {
      const discount = calculateNegotiationScore(
        game.initialPrice,
        game.finalPrice,
        game.minPrice,
      );
      game.discount = discount;
      await game.save();
    }

    res.status(200).json({
      success: true,
      message: "Offer processed successfully",
      data: {
        you: userMessage,
        offer: offer,
        aiResponse: lastRound.aiResponse,
        aiCounter: lastRound.aiCounter,
        status: game.status,
        currentRound: game.rounds.length,
        finalPrice: game.finalPrice,
        discount: game.discount !== undefined ? game.discount + "%" : "0%",
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getGameController = async (req, res) => {
  try {
    const { gameId } = req.params;

    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json({
      success: true,
      data: {
        gameId: game._id,
        product: game.product,
        initialPrice: game.initialPrice,
        status: game.status,
        rounds: game.rounds,
        finalPrice: game.finalPrice,
        difficulty: game.difficulty,
        aiPersonality: game.aiPersonality,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getActiveGameController = async (req, res) => {
  try {
    const userId = req.user?.id;

    const game = await gameModel
      .findOne({ userId, status: "ongoing" })
      .sort({ createdAt: -1 });

    if (!game) {
      return res.status(404).json({ error: "No active game found" });
    }

    console.log(game);

    res.status(200).json({
      success: true,
      data: {
        product: game.product,
        initialPrice: game.initialPrice,
        status: game.status,
        discount: game.discount !== undefined ? game.discount + "%" : "0%",
        finalPrice: game.finalPrice,
        userMessage: game.rounds.at(-1)?.userMessage || "",
        aiResponse: game.rounds.at(-1)?.aiResponse || "",
        aiCounter: game.rounds.at(-1)?.aiCounter || null,
        action: game.rounds.at(-1)?.action || null,
        currentRound: game.rounds.length,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLeaderboardController = async (req, res) => {
  try {
    const topGames = await gameModel
      .find({ status: "completed" })
      .sort({ discount: -1, roundsUsed: 1 })
      .limit(10)
      .select(
        "product initialPrice finalPrice discount roundsUsed rounds userId ",
      )
      .populate("userId");

    res.status(200).json({
      success: true,
      data: topGames.map((game) => ({
        product: game.product,
        initialPrice: game.initialPrice,
        finalPrice: game.finalPrice,
        discount: game.discount + "%",
        roundsUsed: game.rounds.length,
        userName: game.userId?.userName || "Unknown", // Get user name from populated userId
      })),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
