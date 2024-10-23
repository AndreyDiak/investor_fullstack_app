import { Badge } from "./common/badge";

export const HttpError = ({ error }: { error?: Error }) => {
  if (!error) return null;

  return (
    <Badge
      className="w-full text-center rounded-lg"
      variant="danger"
      size="small"
    >
      {error.message}
    </Badge>
  );
};
