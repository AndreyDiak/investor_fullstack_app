import { TemplateCredit } from "@kit/entities";
import { Box, BoxProps } from "@kit/ui";

interface Props extends BoxProps {
  credits: TemplateCredit[];
}
// TODO: add table component to kit
export const CreditsTable = ({ credits, ...rest }: Props) => {
  return (
    <Box
      css={{
        "--table-width": "inherit",
        "--head-text-align": "left",
        "--cell-x-padding": "0.5rem",
        "--cell-y-padding": "0.25rem",
      }}
      {...rest}
    >
      <table
        // @ts-ignore
        css={{
          width: "var(--table-width)",
          borderCollapse: "collapse",
          borderSpacing: 0,
          tableLayout: "fixed",
          th: {
            padding: "var(--cell-y-padding) var(--cell-x-padding)",
            textAlign: "var(--head-text-align)",
            fontFamily: "Roboto",
            fontWeight: "400",
            color: "var(--text-secondary-darken)",
          },
          td: {
            padding: "var(--cell-y-padding) var(--cell-x-padding)",
          },
        }}
      >
        <thead>
          <tr>
            <th>Название</th>
            <th>Количество</th>
            <th>Выплата в мес.</th>
            <th>Выплачено</th>
          </tr>
        </thead>
        <tbody>
          {credits.map((credit) => (
            <tr key={credit.name}>
              <td>{credit.name}</td>
              <td>{credit.amount}</td>
              <td>{credit.payment}</td>
              <td>{credit.repaidAmount}</td>
            </tr>
          ))}
        </tbody>
        {rest.children}
      </table>
    </Box>
  );
};
