export function beatifyPrice(price: number): string {
  if (price < 1000) {
    return String(price);
  }
  return String(price)
    .split("")
    .reverse()
    .reduce((acc, curr, i, arr) => {
      acc += curr;
      if ((i + 1) % 3 === 0 && i !== arr.length - 1) {
        acc += ".";
      }
      return acc;
    }, "")
    .split("")
    .reverse()
    .join("");
}
