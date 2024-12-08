import { GameTemplate } from "@kit/entities";
import {
  Box,
  DialogContent,
  DialogTrigger,
  DialogWrapper,
  Divider,
} from "@kit/ui";
import { DifficultyDisplay } from "../../../shared/ui/difficulty_display";
import { MoneyDisplay } from "../../../shared/ui/money_display";
import { Text } from "../../../shared/ui/text";
import { TemplatePreviewDialog } from "./preview_dialog";

interface TemplateCardProps {
  template: GameTemplate;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  const creditsSummaryPayment = template.credits.reduce(
    (acc, credit) => acc + credit.amount,
    0
  );
  const propertiesSummary = template.properties.reduce(
    (acc, prop) => acc + prop.price,
    0
  );

  return (
    <DialogWrapper placement="top" size="large">
      <DialogTrigger css={{ display: "flex", flexDirection: "column" }}>
        <Box
          css={{
            padding: "16px",
            borderRadius: "16px",
            border: "2px solid white",
            display: "flex",
            flexDirection: "column",
            // background: "var(--color-aqua)",
            backdropFilter: "hue-rotate(45deg)",
            gap: "0.5rem",
            cursor: "pointer",
            transitionDuration: "300ms",
            transitionTimingFunction: "ease-in",
            ":hover": {
              scale: 1.05,
              // background: "var(--color-aqua-darken)",
            },
          }}
        >
          <img
            src={template.job.imgUrl}
            css={{
              maxWidth: "300px",
              maxHeight: "400px",
              borderRadius: "0.5rem",
              borderBottomRightRadius: 0,
              transitionDuration: "400ms",
              transitionTimingFunction: "ease-in-out",
              ":hover": {
                borderBottomRightRadius: "0.5rem",
              },
            }}
          />
          <Box
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text css={{ color: "var(--text-secondary)", fontWeight: "500" }}>
              {template.job.name}
            </Text>
            <DifficultyDisplay difficulty={template.difficulty} />
          </Box>
          <Divider color="var(--text-secondary)" />
          <SavingsListDisplay
            items={[
              { label: "Зарплата", value: template.job.startSalary },
              { label: "Стартовый капитал", value: template.job.savings },
              { label: "Имущество", value: propertiesSummary },
            ]}
          />
          <Divider color="var(--text-secondary)" />
          <SavingsListDisplay
            items={[{ label: "Кредиты", value: creditsSummaryPayment }]}
          />
        </Box>
      </DialogTrigger>
      <DialogContent>
        <TemplatePreviewDialog template={template} />
      </DialogContent>
    </DialogWrapper>
  );
};

const SavingsListDisplay = ({
  items,
}: {
  items: { label: string; value: number }[];
}) => {
  return (
    <Box css={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {items.map(({ label, value }) => (
        <Box
          key={label}
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Text css={{ color: "var(--text-secondary)", fontWeight: "500" }}>
            {label}
          </Text>
          <MoneyDisplay
            count={value}
            variant={2}
            css={{
              color: "#fff",
              fontWeight: "600",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};
