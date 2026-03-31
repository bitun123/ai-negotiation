export function calculateNegotiationScore(initialPrice, finalPrice, minPrice = null) {
  const start = Number(initialPrice);
  const agreed = Number(finalPrice);
  const floor = minPrice === null ? null : Number(minPrice);

  if (!Number.isFinite(start) || !Number.isFinite(agreed) || start <= 0) {
    return 0;
  }

  if (agreed > start || agreed <= 0) {
    return 0;
  }

  // Guard against invalid state where a deal closes below configured minimum.
  if (Number.isFinite(floor) && agreed < floor) {
    return 0;
  }

  const discount = ((start - agreed) / start) * 100;

  return Math.round(discount);
}