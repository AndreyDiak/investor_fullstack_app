import { TemplateCredit } from "@kit/entities";
import { Box, BoxProps } from "@kit/ui";

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

  return credits.map((credit) => (
    <Box {...rest}>
      <Box>
        {credit.name}
        {credit.amount}
      </Box>
      <Box>
        {credit.payment}
        {!hideRepaidAmount && credit.repaidAmount}
      </Box>
    </Box>
  ));
};
