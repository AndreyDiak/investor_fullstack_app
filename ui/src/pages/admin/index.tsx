import { Box } from "@kit/ui";
import { useState } from "react";
import companies from "./../../../../assets/companies.json";
import templates from "./../../../../assets/templates.json";
import { AssetDisplay } from "./_components/_asset_list";

export type Asset = (typeof assets)[number];
type Mode = "edit" | "view";

const assetToLabel: Record<Asset, string> = {
  companies: "Компании",
  templates: "Шаблоны",
};

const assetToList: Record<Asset, unknown[]> = {
  companies,
  templates,
};

const assets = ["companies", "templates"] as const;

export const AdminPage = () => {
  const [active, setActive] = useState<Asset | undefined>();

  return (
    <Box
      css={{
        width: "100%",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        background:
          "linear-gradient(to top right, var(--color-indigo) 10%, var(--color-emerald) 70%)",
      }}
    >
      <Box
        css={{
          borderRight: "1px solid #e4e4e7",
          padding: "20px",
          display: "flex",
          gap: "16px",
        }}
        onClick={() => {
          setActive(undefined);
        }}
      >
        {assets.map((asset, index) => (
          <Box
            key={index}
            onClick={(e) => {
              setActive(asset);
              e.stopPropagation();
            }}
            css={{
              cursor: "pointer",
              width: "200px",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "500",
              background: "#fff",
              transitionDuration: "400ms",
              borderRadius: "1rem",
              border: "2px solid var(--color-indigo)",
              ":hover": {
                scale: 1.05,
              },
            }}
          >
            {assetToLabel[asset]}
          </Box>
        ))}
      </Box>
      <Box css={{ padding: "1rem", height: "100vh" }}>
        {active && <AssetDisplay type={active} items={assetToList[active]} />}
      </Box>
    </Box>
  );
};
