import { Badge } from "@kit/ui";

export const HttpError = ({ error }: { error?: Error }) => {
  if (!error) return null;

  return (
    <Badge
      className="w-full text-center rounded-xl"
      variant="danger"
      size="small"
    >
      {Array.isArray(error) ? error[0].message : error.message}
    </Badge>
  );
};
