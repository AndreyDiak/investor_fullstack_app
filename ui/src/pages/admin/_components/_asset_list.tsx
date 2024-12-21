import { Company, GameTemplate } from "@kit/entities";
import { Box, Button } from "@kit/ui";
import { ReactNode, useState } from "react";
import { Asset } from "..";
import { TemplateCard } from "../../../shared/ui/template_card";
import { CompanyForm, TemplateForm } from "./_asset_form";

interface Props {
  type: Asset;
  items: unknown[];
}

const assetToDisplay: Record<string, (items: unknown[]) => ReactNode> = {
  companies: (items) => <CompanyListDisplay items={items as Company[]} />,
  templates: (items) => <TemplateListDisplay items={items as GameTemplate[]} />,
};

const assetToForm: Record<string, ReactNode> = {
  companies: <CompanyForm />,
  templates: <TemplateForm />,
};

export const AssetDisplay = ({ items, type }: Props) => {
  const [mode, setMode] = useState<"edit" | "view">("view");

  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxHeight: "100%",
      }}
    >
      <Box
        css={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          mawHeight: "70%",
        }}
      >
        {{ edit: assetToForm[type], view: assetToDisplay[type](items) }[mode]}
      </Box>
      <Box css={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            setMode("edit");
          }}
        >
          Добавить
        </Button>
      </Box>
    </Box>
  );
};

const TemplateListDisplay = ({ items }: { items: GameTemplate[] }) => {
  return items.map((item, index) => (
    <TemplateCard
      key={index}
      template={item}
      css={{
        width: "350px",
      }}
    />
  ));
};

const CompanyListDisplay = ({ items }: { items: Company[] }) => {
  return items.map((item) => (
    <Box key={item.name}>
      <Box>{item.name}</Box>
      <Box>{item.description}</Box>
    </Box>
  ));
};
