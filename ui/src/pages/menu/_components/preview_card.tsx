import { Plus } from "@gravity-ui/icons";
import {
  BaseButton,
  Box,
  BoxProps,
  cn,
  DialogContent,
  DialogTrigger,
  DialogWrapper,
} from "@kit/ui";
import { forwardRef } from "react";
import { Game } from "../../../entities/game/types";
import { CreateGameDialog } from "./_create_game_dialog";

export const MenuPreviewCard = ({ game }: { game?: Game }) => {
  if (!game) {
    return (
      <DialogWrapper size="screen" placement="top">
        <DialogTrigger>
          <CardWrapper className="hover:bg-teal-700 hover:border-teal-700">
            <BaseButton className="flex flex-col items-center">
              <Plus width={30} height={30} color="#fff" />
              <span className="text-2xl font-semibold font-main text-white">
                New Game
              </span>
            </BaseButton>
          </CardWrapper>
        </DialogTrigger>
        <DialogContent>
          <CreateGameDialog />
        </DialogContent>
      </DialogWrapper>
    );
  }

  return <CardWrapper>some info...</CardWrapper>;
};

const CardWrapper = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(
          className,
          `border-emerald-900 border-2 rounded-2xl pt-8 px-6 pb-4 
          flex justify-center w-[450px] h-[600px] items-center bg-teal-600 
          cursor-pointer duration-300 hover:scale-105 ease-in-out`,
        )}
        {...rest}
      />
    );
  },
);
