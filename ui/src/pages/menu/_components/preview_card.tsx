import { Game } from "../../../entities/game/types";
import { cn } from "../../../shared/lib";
import { Box, BoxProps } from "../../../shared/ui/common/box";

export const MenuPreviewCard = ({ game }: { game?: Game }) => {
  if (!game) {
    return <CardWrapper>New Game</CardWrapper>;
  }

  return <CardWrapper>some info...</CardWrapper>;
};

const CardWrapper = ({ className, ...rest }: BoxProps) => {
  return (
    <Box
      className={cn(
        className,
        "border-emerald-900 border-2 rounded-2xl pt-8 px-6 pb-4"
      )}
      {...rest}
    />
  );
};
