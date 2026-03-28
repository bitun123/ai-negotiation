import test from "node:test";
import assert from "node:assert/strict";
import { createProcessOffer } from "../src/services/game.service.js";

const createGame = (overrides = {}) => {
  const game = {
    _id: "game-1",
    status: "ongoing",
    rounds: [],
    maxRounds: 5,
    minPrice: 700,
    initialPrice: 1000,
    difficulty: "medium",
    aiPersonality: "friendly",
    finalPrice: null,
    save: async function () {
      return this;
    },
    ...overrides,
  };

  if (!Array.isArray(game.rounds)) {
    game.rounds = [];
  }

  return game;
};

const createModel = (game) => ({
  findById: async () => game,
});

test("throws on negative offer", async () => {
  const game = createGame();
  const processOffer = createProcessOffer({
    model: createModel(game),
    aiResponder: async () => "stub",
    historyFormatter: () => "No previous negotiation.",
  });

  await assert.rejects(() => processOffer("game-1", -10), /Invalid offer/);
  assert.equal(game.rounds.length, 0);
});

test("throws on non-numeric offer", async () => {
  const game = createGame();
  const processOffer = createProcessOffer({
    model: createModel(game),
    aiResponder: async () => "stub",
    historyFormatter: () => "No previous negotiation.",
  });

  await assert.rejects(() => processOffer("game-1", "abc"), /Invalid offer/);
});

test("below min price rejects and counter never drops below minPrice", async () => {
  const game = createGame({
    rounds: [{ round: 1, userOffer: 500, aiResponse: "No", aiCounter: 720 }],
    minPrice: 700,
    difficulty: "hard",
    aiPersonality: "greedy",
  });

  let capturedAction = null;

  const processOffer = createProcessOffer({
    model: createModel(game),
    aiResponder: async (input) => {
      capturedAction = input.action;
      return "Too low.";
    },
    historyFormatter: () => "Round 1...",
  });

  const result = await processOffer("game-1", 650);
  const lastRound = result.rounds.at(-1);

  assert.equal(capturedAction, "reject");
  assert.equal(lastRound.userOffer, 650);
  assert.equal(lastRound.aiResponse, "Too low.");
  assert.ok(lastRound.aiCounter >= result.minPrice);
  assert.equal(result.status, "ongoing");
});

test("offer in negotiate zone returns negotiate action and counter >= minPrice", async () => {
  const game = createGame({
    minPrice: 700,
    initialPrice: 1000,
  });

  let capturedAction = null;

  const processOffer = createProcessOffer({
    model: createModel(game),
    aiResponder: async (input) => {
      capturedAction = input.action;
      return "Can do a little better.";
    },
    historyFormatter: () => "No previous negotiation.",
  });

  const result = await processOffer("game-1", 800); // below target(850), above min(700)
  const lastRound = result.rounds.at(-1);

  assert.equal(capturedAction, "negotiate");
  assert.equal(lastRound.aiResponse, "Can do a little better.");
  assert.ok(lastRound.aiCounter >= result.minPrice);
  assert.equal(result.status, "ongoing");
});

test("good offer accepts and completes game", async () => {
  const game = createGame({
    minPrice: 700,
    initialPrice: 1000,
    difficulty: "medium",
  });

  let capturedAction = null;

  const processOffer = createProcessOffer({
    model: createModel(game),
    aiResponder: async (input) => {
      capturedAction = input.action;
      return "Deal done.";
    },
    historyFormatter: () => "No previous negotiation.",
  });

  const result = await processOffer("game-1", 900);

  assert.equal(capturedAction, "accept");
  assert.equal(result.finalPrice, 900);
  assert.equal(result.status, "completed");
  assert.equal(result.rounds.at(-1).aiCounter, null);
});

test("last round below min ends with no deal", async () => {
  const game = createGame({
    maxRounds: 3,
    rounds: [
      { round: 1, userOffer: 600, aiResponse: "No", aiCounter: 900 },
      { round: 2, userOffer: 650, aiResponse: "Still low", aiCounter: 850 },
    ],
    minPrice: 700,
    initialPrice: 1000,
  });

  const processOffer = createProcessOffer({
    model: createModel(game),
    aiResponder: async () => "Maybe",
    historyFormatter: () => "Rounds 1 and 2",
  });

  const result = await processOffer("game-1", 650);
  const lastRound = result.rounds.at(-1);

  assert.equal(result.status, "completed");
  assert.equal(result.finalPrice, null);
  assert.equal(lastRound.aiResponse, "No deal.");
  assert.equal(lastRound.aiCounter, null);
});

test("completed game cannot accept more offers", async () => {
  const game = createGame({ status: "completed" });

  const processOffer = createProcessOffer({
    model: createModel(game),
    aiResponder: async () => "stub",
    historyFormatter: () => "No previous negotiation.",
  });

  await assert.rejects(() => processOffer("game-1", 800), /Game completed/);
});
