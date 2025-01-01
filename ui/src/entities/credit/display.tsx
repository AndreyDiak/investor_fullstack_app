import { Box, BoxProps } from "@gravity-ui/uikit";
import { TemplateCredit } from "@kit/entities";
import { MoneyDisplay } from "../../shared/ui/money_display";
import { Text } from "../../shared/ui/text";

interface CreditsDisplayProps extends BoxProps {
  credits: TemplateCredit[];
  hideRepaidAmount?: boolean;
}

export const CreditsDisplay = ({
  credits,
  hideRepaidAmount = false,
  ...rest
}: CreditsDisplayProps) => {
  if (credits.length === 0) {
    return null;
  }

  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        minWidth: "220px",
      }}
      {...rest}
    >
      {credits.map((credit) => (
        <Box key={credit.name}>
          <Box
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>{credit.name}</Text>
            <MoneyDisplay
              count={credit.amount}
              variant={2}
              css={{ fontSize: "1rem", fontWeight: "500" }}
            />
          </Box>
          <Box>
            {credit.payment}
            {!hideRepaidAmount && credit.repaidAmount}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
