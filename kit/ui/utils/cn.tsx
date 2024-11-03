const cn = (...classNames: (string | undefined)[]) =>
  classNames.filter((v) => v).join(" ");

export default cn;
