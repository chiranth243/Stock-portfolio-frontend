// utils/generateMockHistory.js
export function generateMockHistory(latestPrice, baseDate = new Date(), days = 7) {
  const data = [];
  let price = latestPrice;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() - i);

    // Simulate fluctuation
    price = +(price + (Math.random() * 10 - 5)).toFixed(2);

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price,
    });
  }

  return data;
}
