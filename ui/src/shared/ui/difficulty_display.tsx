import { Box, BoxProps, cn } from "@kit/ui";
import { forwardRef } from "react";

export type Difficulty = "easy" | "normal" | "hard";

interface DifficultyDisplayProps extends BoxProps {
  difficulty: Difficulty;
}

export const DifficultyDisplay = forwardRef<
  HTMLDivElement,
  DifficultyDisplayProps
>(({ difficulty, className, ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      className={cn(`py-1 px-3 font-semibold rounded-lg text-white`, className)}
      style={{
        backgroundColor: difficultyToColorMap[difficulty],
      }}
      {...rest}
    >
      {difficultyToLabelMap[difficulty]}
    </Box>
  );
});

const difficultyToLabelMap: Record<Difficulty, string> = {
  easy: "Легко",
  normal: "Нормально",
  hard: "Сложно",
};

const difficultyToColorMap: Record<Difficulty, string> = {
  easy: "rgb(46, 125, 50)",
  normal: "rgb(249, 168, 37)",
  hard: "rgb(191, 54, 12)",
};
