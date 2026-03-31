import test from "node:test";
import assert from "node:assert/strict";
import { calculateNegotiationScore } from "../src/utils/calculateNegotiationScore.js";

test("returns rounded discount from initial to final deal price", () => {
  const discount = calculateNegotiationScore(1000, 845, 700);
  assert.equal(discount, 16);
});

test("returns 0 for unfinished game with no final price", () => {
  const discount = calculateNegotiationScore(1000, null, 700);
  assert.equal(discount, 0);
});

test("returns 0 when final price is above initial price", () => {
  const discount = calculateNegotiationScore(1000, 1200, 700);
  assert.equal(discount, 0);
});

test("returns 0 when final price goes below minimum price", () => {
  const discount = calculateNegotiationScore(1000, 600, 700);
  assert.equal(discount, 0);
});
