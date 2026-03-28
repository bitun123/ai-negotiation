import { Router } from "express";
import {
  createGameController,
  makeOfferController,
  getGameController,
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

export default gameRouter;
