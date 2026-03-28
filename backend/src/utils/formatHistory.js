
export const formatHistory = (rounds) => {
  if (!rounds || rounds.length === 0) return "No previous negotiation.";

  return rounds
    .map(
      (r) =>
        `Round ${r.round}: User offered ${r.userOffer}, You replied: ${r.aiResponse}`
    )
    .join("\n");
};