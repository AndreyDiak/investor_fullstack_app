export function generateStockInitialPrice() {
  const rand = Math.random() * 100;

  const index = (() => {
    if (rand < 50) {
      return 0;
    }
    if (rand < 85) {
      return 1;
    }
    return 2;
  })();

  const variant = variants[index];
  const range = variant.max - variant.min;
  const price = Number((Math.random() * range + variant.min).toFixed(1));

  return price;
}
/**
 * 50% - chance to first price range
 * 35% - chance to second price range
 * 15% - chance to third price range
 */
const variants = [
  {
    min: 500,
    max: 2_000,
  },
  {
    min: 5_000,
    max: 15_000,
  },
  {
    min: 50_000,
    max: 100_000,
  },
] as const;
