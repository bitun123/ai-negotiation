import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    userId: {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user",
    required : true
    },
  gameId: {
    type : mongoose.Schema.Types.ObjectId,
    ref : "game",
    required : true
    },
    finalPrice: {
      type: Number,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    roundsUsed: {
      type: Number
    },
    discount: {
      type: Number,
        required: true
    }
  },
  { timestamps: true }
);

// 🔥 fast ranking
leaderboardSchema.index({ score: -1, finalPrice: 1 });


const leaderboardModel = mongoose.model("leaderboard", leaderboardSchema);

export default leaderboardModel;