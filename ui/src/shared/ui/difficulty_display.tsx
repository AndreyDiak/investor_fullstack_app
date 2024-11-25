import { Box, BoxProps } from "@kit/ui";
import { forwardRef } from "react";

export type Difficulty = "easy" | "normal" | "hard";

interface DifficultyDisplayProps extends BoxProps {
  difficulty: Difficulty;
}

export const DifficultyDisplay = forwardRef<
  HTMLDivElement,
  DifficultyDisplayProps
>(({ difficulty, ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      css={{
        padding: "0.25rem 0.75rem",
        fontWeight: "600",
        borderRadius: "0.5rem",
        color: "#fff",
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

export const difficultyToColorMap: Record<Difficulty, string> = {
  easy: "var(--color-success)",
  normal: "var(--color-warning)",
  hard: "var(--color-danger)",
};
