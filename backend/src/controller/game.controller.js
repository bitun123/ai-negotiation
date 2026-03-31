
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
        id : newGame._id,
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
    const { offer , userMessage} = req.body;
    if (offer === undefined) {
      return res.status(400).json({ error: "Offer is required" });
    }

    const game = await processOffer(gameId, offer, userMessage);

    const lastRound = game.rounds.at(-1);

if(game.status === "completed"){
  const discount = calculateNegotiationScore(game.initialPrice, game.finalPrice ,game.minPrice);
  game.discount = discount;
  await game.save();
}

    res.status(200).json({
      success: true,
      message: "Offer processed successfully",
      data: {
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


export const getLeaderboardController = async(req, res)=>{
  try {
    const userId = req.user?.id;
    const games = await gameModel.find({userId, status: "completed"}).sort({createdAt: -1})
    
    
    res.status(200).json({
      success: true,
      data: games.map(game=>({
        userId: game.userId,
        gameId: game._id,
        product: game.product,
        finalPrice: game.finalPrice,
        createdAt: game.createdAt,
      })),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
