import { Plus } from "@gravity-ui/icons";
import {
  BaseButton,
  Box,
  BoxProps,
  DialogContent,
  DialogTrigger,
  DialogWrapper,
} from "@kit/ui";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../../../entities/game/types";
import { Text } from "./../../../shared/ui/text";
import { CreateGameDialog } from "./_create_game_dialog";

export const MenuPreviewCard = ({ game }: { game?: Game }) => {
  const navigate = useNavigate();
  if (!game) {
    return (
      <DialogWrapper placement="top" size="large">
        <DialogTrigger>
          <CardWrapper
            onClick={() => {
              navigate("/new");
            }}
            css={{
              backgroundColor: "var(--color-aqua)",
              border: "2px solid var(--color-aqua-dark)",
              ":hover": {
                background: "var(--color-aqua-light)",
                borderColor: "var(--color-aqua)",
              },
            }}
          >
            <BaseButton
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Plus width={30} height={30} color="#fff" />
              <Text
                css={{ fontSize: "1.5rem", lineHeight: "2rem", color: "#fff" }}
              >
                Новая игра
              </Text>
            </BaseButton>
          </CardWrapper>
        </DialogTrigger>
        <DialogContent css={{ width: "1200px" }}>
          <CreateGameDialog />
        </DialogContent>
      </DialogWrapper>
    );
  }

  return <CardWrapper>some info...</CardWrapper>;
};

const CardWrapper = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "450px",
        height: "600px",
        cursor: "pointer",
        borderRadius: "1rem",
        transitionDuration: "400ms",
        transitionTimingFunction: "ease-in-out",
        ":hover": {
          scale: "1.05",
        },
      }}
      {...props}
    />
  );
});
