const cn = (...classNames: (string | undefined)[]): string =>
  classNames.filter((v) => v).join(" ");

export default cn;
