const calculateScore = (game) => {
  // ❗ safety checks
  if (!game.initialPrice || !game.finalPrice) {
    return 0;
  }

  const roundsUsed = game.rounds.length;

  // 🧮 base score
  const baseScore = game.initialPrice - game.finalPrice;

  // 🎯 bonus (never negative)
  const bonus = Math.max(0, (game.maxRounds - roundsUsed) * 10);

  const totalScore = baseScore + bonus;

  return totalScore;
};

export default calculateScore;