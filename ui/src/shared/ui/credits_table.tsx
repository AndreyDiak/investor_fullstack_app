import { TemplateCredit } from "@kit/entities";
import { Box, BoxProps, Table } from "@kit/ui";
import { MoneyDisplay } from "./money_display";

interface Props extends BoxProps {
  credits: TemplateCredit[];
}
export const CreditsTable = ({ credits, ...rest }: Props) => {
  return (
    <Table
      data={credits}
      columns={[
        {
          title: "Предмет",
          render: (credit) => credit.name,
        },
        {
          title: "Количество",
          render: (credit) => (
            <MoneyDisplay
              count={credit.payment}
              css={{
                fontWeight: "600",
              }}
            />
          ),
        },
        {
          title: "Разовая выплата (мес.)",
          render: (credit) => (
            <MoneyDisplay
              count={credit.payment}
              css={{
                fontWeight: "600",
              }}
            />
          ),
        },
        {
          title: "Выплачено",
          render: (credit) => (
            <MoneyDisplay
              count={credit.repaidAmount}
              css={{
                fontWeight: "600",
              }}
            />
          ),
        },
        {
          title: "Осталось выплачивать (мес.)",
          render: (credit) => (
            <Box css={{ fontWeight: "600" }}>
              {(credit.amount - credit.repaidAmount) / credit.payment}
            </Box>
          ),
        },
      ]}
      css={{
        "--cell-content-align": "right",
      }}
      {...rest}
    />
  );
};
