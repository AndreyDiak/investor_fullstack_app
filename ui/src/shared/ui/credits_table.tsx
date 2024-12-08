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
          title: "Цель",
          render: (credit) => (
            <Box>
              {credit.imgUrl ? (
                <img
                  src={credit.imgUrl}
                  alt={credit.name}
                  width={32}
                  height={32}
                />
              ) : (
                credit.name
              )}
            </Box>
          ),
          width: 60,
        },
        {
          title: "Сумма",
          render: (credit) => (
            <MoneyDisplay
              count={credit.amount}
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
              {Math.ceil(
                (credit.amount - credit.repaidAmount) / credit.payment
              )}
            </Box>
          ),
        },
      ]}
      css={{
        "--head-text-align": "center",
        "--cell-content-align": "center",
      }}
      {...rest}
    />
  );
};
