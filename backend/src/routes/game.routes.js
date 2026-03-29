import { Router } from "express";
import {
  createGameController,
  makeOfferController,
  getGameController,
  getLeaderboardController
} from "../controller/game.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const gameRouter = Router();


//**
// @routes POST /api/games/
// @desc Start a new game
// @input None
// */
gameRouter.post("/", authMiddleware, createGameController);


//** @routes POST /api/games/:gameId/offer
// @desc Make an offer in an ongoing game
// @input { offer }
// */
gameRouter.post("/:gameId/offer", authMiddleware, makeOfferController);


//** @routes GET /api/games/:gameId
// @desc Get current game state
// @input None
// */
gameRouter.get("/:gameId", authMiddleware, getGameController);

//** @routes post  /api/games/leaderboard
// @desc Get leaderboard of the user
// @input None
// */
// gameRouter.get("/", authMiddleware, getAllGamesController);

gameRouter.post("/leaderboard", authMiddleware, getLeaderboardController);

export default gameRouter;
