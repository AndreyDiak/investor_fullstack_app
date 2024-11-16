import { Box } from "@kit/ui";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useGameStore } from "../../api/game";
import { useStoreFetch } from "../../shared/hooks/use_store_fetch";
import { MenuPreviewCard } from "./_components/preview_card";

const MAX_GAMES_SIZE = 3;

export const MenuPage = () => {
  const [games, loading, error, fetchMy] = useStoreFetch(
    useGameStore((state) => state.fetchMy)
  );

  useEffect(() => {
    fetchMy();
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
    <Box className="w-full h-screen flex items-center justify-center bg-[url(/public/menu.jpeg)] bg-cover">
      <Box className="flex items-center justify-center gap-24">
        {previewGames.map((previewGame, index) => (
          <MenuPreviewCard key={index} game={previewGame} />
        ))}
      </Box>
    </Box>
  );
};
