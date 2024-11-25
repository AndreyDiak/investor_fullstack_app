import { Badge } from "@kit/ui";

export const HttpError = ({ error }: { error?: Error }) => {
  if (!error) return null;

  return (
    <Badge
      variant="danger"
      size="small"
      css={{
        width: "100%",
        textAlign: "center",
        borderRadius: "0.75rem",
      }}
    >
      {Array.isArray(error) ? error[0].message : error.message}
    </Badge>
  );
};
