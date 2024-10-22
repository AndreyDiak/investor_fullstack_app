export const mergeClassNames = (...classNames: (string | undefined)[]) =>
  classNames.filter((v) => v).join(" ");
