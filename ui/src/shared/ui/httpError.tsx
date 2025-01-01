// import { Badge } from "@gravity-ui/uikit";

import { Label } from "@gravity-ui/uikit";

export const HttpError = ({ error }: { error?: Error }) => {
  if (!error) return null;

  return (
    <Label
      theme="danger"
      size="m"
      css={{
        width: "100%",
        textAlign: "center",
        borderRadius: "0.75rem",
      }}
    >
      {Array.isArray(error) ? error[0].message : error.message}
    </Label>
  );
};
