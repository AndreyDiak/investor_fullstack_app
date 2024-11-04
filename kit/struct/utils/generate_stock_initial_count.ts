export function generateStockInitialCount() {
  const range = MAX_STOCK_COUNT - MIN_STOCK_COUNT;
  return Math.round(Math.random() * range + MIN_STOCK_COUNT);
}

const MAX_STOCK_COUNT = 200;
const MIN_STOCK_COUNT = 20;
