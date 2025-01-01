// import {
//   BaseButton,
//   Box,
//   BoxProps,
//   DialogContent,
//   DialogTrigger,
//   DialogWrapper,
// } from "@gravity-ui/uikit";
import { Box, BoxProps } from "@gravity-ui/uikit";
import { useNavigate } from "react-router-dom";
import { Game } from "../../../entities/game/types";

export const MenuPreviewCard = ({ game }: { game?: Game }) => {
  const navigate = useNavigate();
  if (!game) {
    return (
      <Box>create game dialog</Box>
      // <DialogWrapper placement="top" size="large">
      //   <DialogTrigger>
      //     <CardWrapper
      //       onClick={() => {
      //         navigate("/new");
      //       }}
      //       css={{
      //         backgroundColor: "transparent",
      //         border: "2px solid white",
      //         boxShadow: "0 0 100px rgba(0, 0, 0, 0.2)",
      //       }}
      //     >
      //       <BaseButton
      //         css={{
      //           display: "flex",
      //           flexDirection: "column",
      //           alignItems: "center",
      //         }}
      //       >
      //         <Plus width={30} height={30} color="#fff" />
      //         <Text
      //           css={{ fontSize: "1.5rem", lineHeight: "2rem", color: "#fff" }}
      //         >
      //           Новая игра
      //         </Text>
      //       </BaseButton>
      //     </CardWrapper>
      //   </DialogTrigger>
      //   <DialogContent css={{ width: "1200px" }}>
      //     <CreateGameDialog />
      //   </DialogContent>
      // </DialogWrapper>
    );
  }

  return <CardWrapper>some info...</CardWrapper>;
};

const CardWrapper = (props: BoxProps) => {
  return (
    <Box
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
};
