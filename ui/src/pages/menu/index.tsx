import { Box } from "@kit/ui";
import { useEffect } from "react";
import { useGamesStore } from "../../api/games";
import { MenuPreviewCard } from "./_components/preview_card";

const MAX_GAMES_SIZE = 3;

export const MenuPage = () => {
  const fetch = useGamesStore((state) => state.fetch);
  const games = useGamesStore((state) => state.data);

  useEffect(() => {
    fetch();
  }, []);

  const previewGames = Array(MAX_GAMES_SIZE)
    .fill(null)
    .map((_, index) => games?.[index]);

  return (
    <Box className="w-full h-screen flex items-center justify-center bg-[url(/public/menu.jpeg)] bg-cover">
      <Box className="flex items-center justify-center gap-24">
        {previewGames.map((previewGame, index) => (
          <MenuPreviewCard key={index} game={previewGame} />
        ))}
      </Box>
    </Box>
  );
};
