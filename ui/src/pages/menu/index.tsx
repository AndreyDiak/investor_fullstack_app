import { Box } from "@kit/ui";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useGameStore } from "../../api/game";
import { useStoreFetch } from "../../shared/hooks/use_store_fetch";
import { MenuPreviewCard } from "./_components/preview_card";

const MAX_GAMES_SIZE = 3;

export const MenuPage = () => {
  const {
    data: games,
    loading,
    error,
    fetch,
  } = useStoreFetch(useGameStore((state) => state.fetchMy));

  useEffect(() => {
    fetch();
  }, []);

  const previewGames = useMemo(
    () =>
      Array(MAX_GAMES_SIZE)
        .fill(null)
        .map((_, index) => games?.[index]),
    [games]
  );

  if (loading) {
    return <Box>loading...</Box>;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <Box
      css={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(to top right, var(--color-indigo) 30%, var(--color-emerald) 70%)",
      }}
    >
      <Box
        css={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          gap: "2.5rem",
        }}
      >
        {previewGames.map((previewGame, index) => (
          <MenuPreviewCard key={index} game={previewGame} />
        ))}
      </Box>
    </Box>
  );
};
