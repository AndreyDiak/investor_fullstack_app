import { Plus } from "@gravity-ui/icons";
import {
  BaseButton,
  Box,
  BoxProps,
  cn,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogHeading,
  DialogTrigger,
  DialogWrapper,
} from "@kit/ui";
import { forwardRef, useCallback } from "react";
import { useGameStore } from "../../../api/game";
import { Game } from "../../../entities/game/types";

export const MenuPreviewCard = ({ game }: { game?: Game }) => {
  const create = useGameStore((state) => state.create);

  const handleCreate = useCallback(() => {}, [game]);

  if (!game) {
    return (
      <DialogWrapper size="screen" placement="top">
        <DialogTrigger>
          <CardWrapper className="hover:bg-teal-700 hover:border-teal-700">
            <BaseButton
              className="flex flex-col items-center"
              onClick={() => {}}
            >
              <Plus width={30} height={30} color="#fff" />
              <span className="text-2xl font-semibold font-main text-white">
                New Game
              </span>
            </BaseButton>
          </CardWrapper>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogHeading>Creating new Game</DialogHeading>
          </DialogHeader>
          <DialogBody>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
            saepe dicta velit incidunt quaerat iure ea doloremque facilis
            asperiores quia, assumenda itaque nemo maiores, autem non quod
            nesciunt quibusdam at! Nemo facilis natus molestiae quisquam quas
            neque dicta officia rem exercitationem, vero optio necessitatibus
            cumque non, provident soluta sequi tenetur!
          </DialogBody>
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
        cursor-pointer duration-300 hover:scale-105 ease-in-out`
        )}
        {...rest}
      />
    );
  }
);
