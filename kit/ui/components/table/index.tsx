import { HTMLAttributes, ReactNode } from "react";
import { Box, BoxProps } from "../box";

interface TableColumn<D extends unknown> {
  title: ReactNode;
  width?: number;
  render: (datum: D, rowIndex: number) => ReactNode;
}

interface TableProps<D> extends BoxProps {
  columns: TableColumn<D>[];
  data: D[];
}

export const Table = <D extends unknown>({
  columns,
  data,
  ...rest
}: TableProps<D>) => {
  return (
    <Box
      css={{
        "--table-width": "inherit",
        "--head-text-align": "left",
        "--cell-x-padding": "0.75rem",
        "--cell-y-padding": "0.25rem",
        "--cell-content-align": "left",
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
        }}
      >
        <thead>
          <TableRow>
            {columns.map((column, columnIndex) => (
              <TableHead key={columnIndex}>{column.title}</TableHead>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {data.map((datum, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={columnIndex}
                  css={{
                    width: column.width,
                  }}
                >
                  {column.render(datum, rowIndex)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
        {rest.children}
      </table>
    </Box>
  );
};

const TableHead = (props: HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th
      // @ts-ignore
      css={{
        padding: "var(--cell-y-padding) var(--cell-x-padding)",
        textAlign: "var(--head-text-align)",
        fontFamily: "Roboto",
        fontWeight: "400",
        color: "var(--text-secondary-darken)",
      }}
      {...props}
    />
  );
};

const TableCell = ({
  children,
  ...rest
}: HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td
      // @ts-ignore
      css={{
        padding: "var(--cell-y-padding) var(--cell-x-padding)",
      }}
      {...rest}
    >
      <Box
        css={{
          width: "inherit",
          display: "flex",
          justifyContent: "var(--cell-content-align)",
        }}
      >
        {children}
      </Box>
    </td>
  );
};

const TableRow = (props: HTMLAttributes<HTMLTableRowElement>) => {
  return <tr css={{ position: "relative" }} {...props} />;
};
