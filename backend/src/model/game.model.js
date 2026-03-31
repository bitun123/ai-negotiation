import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({
  round: Number,
  userOffer: Number,
  aiResponse: String,
  aiCounter: Number,
});

const gameSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    initialPrice: {
      type: Number,
      default: null,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
    maxRounds: {
      type: Number,
      default: 5,
    },
    rounds: [roundSchema],
    aiPersonality: {
      type: String,
      default: "normal",
    },
    difficulty: {
      type: String,
      default: "medium",
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);





const gameModel = mongoose.model("game", gameSchema);

export default gameModel;
