function generateProduct(selectedProduct, selectedDifficulty) {
  const productConfig = {
    "iPhone 14": { min: 70000, max: 90000 },
    "Gaming Laptop": { min: 60000, max: 120000 },
    "Wireless Headphones": { min: 2000, max: 15000 },
    "Smart Watch": { min: 3000, max: 25000 },
    "Sneakers": { min: 2000, max: 12000 },
    "Backpack": { min: 800, max: 5000 },
    "Electric Scooter": { min: 50000, max: 120000 },
    "4K TV": { min: 30000, max: 100000 },
    "Bluetooth Speaker": { min: 1500, max: 10000 },
    "Fitness Tracker": { min: 1500, max: 8000 },
    "Coffee Maker": { min: 2000, max: 15000 },
    "Air Purifier": { min: 8000, max: 40000 },
    "Digital Camera": { min: 25000, max: 150000 },
    "Smart Thermostat": { min: 5000, max: 20000 },
  };

  // 🛑 Validate product
  if (!productConfig[selectedProduct]) {
    throw new Error("Invalid product selected");
  }

  const { min, max } = productConfig[selectedProduct];

  // 💰 Initial price
  const initialPrice = Math.round(Math.random() * (max - min) + min);

  // 🎯 Difficulty-based multiplier
  let minMultiplier;

  switch (selectedDifficulty) {
    case "easy":
      minMultiplier = 0.5 + Math.random() * 0.1;
      break;
    case "medium":
      minMultiplier = 0.6 + Math.random() * 0.2;
      break;
    case "hard":
      minMultiplier = 0.75 + Math.random() * 0.1;
      break;
    default:
      throw new Error("Invalid difficulty level");
  }

  const minPrice = Math.round(initialPrice * minMultiplier);

  const targetPrice = Math.round(initialPrice * 0.85);

  const personalities = ["friendly", "greedy", "strict"];
  const aiPersonality =
    personalities[Math.floor(Math.random() * personalities.length)];

  return {
    product: selectedProduct,
    initialPrice,
    minPrice,
    targetPrice,
    difficulty: selectedDifficulty,
    aiPersonality,
  };
}

export default generateProduct;