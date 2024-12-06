import { HTMLAttributes } from "react";
import iconSrc1 from "../../assets/money/1.png";
import iconSrc2 from "../../assets/money/2.png";
import iconSrc3 from "../../assets/money/3.png";

export type MoneyIconVariant = 1 | 2 | 3;

interface MoneyIconProps extends HTMLAttributes<HTMLImageElement> {
  variant?: MoneyIconVariant;
}

export const MoneyIcon = ({ variant = 2, ...rest }: MoneyIconProps) => {
  return <img src={variantToSrcMap[variant]} alt="money" {...rest} />;
};

const variantToSrcMap: Record<MoneyIconVariant, string> = {
  1: iconSrc1,
  2: iconSrc2,
  3: iconSrc3,
};
