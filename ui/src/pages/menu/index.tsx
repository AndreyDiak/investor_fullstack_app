import { useEffect } from "react";
import { useGameStore } from "../../api/games";
import { Box } from "../../shared/ui/common/box";
import { MenuPreviewCard } from "./_components/preview_card";

const MAX_GAMES_SIZE = 3;

export const MenuPage = () => {
  const fetch = useGameStore((state) => state.fetch);
  const games = useGameStore((state) => state.data);

  useEffect(() => {
    fetch();
  }, []);

  const previewGames = Array(MAX_GAMES_SIZE)
    .fill(null)
    .map((_, index) => games?.[index]);

  console.log({ games });
  // // const query = useQuery({
  // //   queryKey: ["games"],
  // //   queryFn: api.games.getState().fetch,
  // });

  return (
    <Box className="w-full h-screen flex items-center justify-center">
      <Box className="flex items-center justify-center gap-24">
        {previewGames.map((previewGame, index) => (
          <MenuPreviewCard key={index} game={previewGame} />
        ))}
      </Box>
    </Box>
  );
};
