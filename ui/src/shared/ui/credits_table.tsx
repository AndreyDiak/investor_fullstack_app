import { Box, BoxProps } from "@gravity-ui/uikit";
import { TemplateCredit } from "@kit/entities";

interface Props extends BoxProps {
  credits: TemplateCredit[];
}
export const CreditsTable = ({ credits, ...rest }: Props) => {
  return (
    <Box>credits table</Box>
    // <Table
    //   data={credits}
    //   columns={[
    //     {
    //       title: "Цель",
    //       render: (credit) => (
    //         <Box>
    //           {credit.imgUrl ? (
    //             <TooltipWrapper>
    //               <TooltipTrigger>
    //                 <img
    //                   src={credit.imgUrl}
    //                   alt={credit.name}
    //                   width={32}
    //                   height={32}
    //                 />
    //               </TooltipTrigger>
    //               <TooltipContent
    //                 css={{
    //                   backgroundColor: "var(--text-emerald)",
    //                   color: "white",
    //                   fontWeight: "500",
    //                 }}
    //               >
    //                 <Box>{credit.name}</Box>
    //               </TooltipContent>
    //             </TooltipWrapper>
    //           ) : (
    //             credit.name
    //           )}
    //         </Box>
    //       ),
    //       width: 80,
    //     },
    //     {
    //       title: "Сумма",
    //       render: (credit) => (
    //         <MoneyDisplay count={credit.amount} css={moneyDisplayStyles} />
    //       ),
    //     },
    //     {
    //       title: "Разовая выплата (мес.)",
    //       render: (credit) => (
    //         <MoneyDisplay count={credit.payment} css={moneyDisplayStyles} />
    //       ),
    //     },
    //     {
    //       title: "Выплачено",
    //       render: (credit) => (
    //         <MoneyDisplay
    //           count={credit.repaidAmount}
    //           css={moneyDisplayStyles}
    //         />
    //       ),
    //     },
    //     {
    //       title: "Мес. до выплаты",
    //       render: (credit) => (
    //         <Box css={{ fontWeight: "600" }}>
    //           {Math.ceil(
    //             (credit.amount - credit.repaidAmount) / credit.payment
    //           )}
    //         </Box>
    //       ),
    //     },
    //   ]}
    //   css={{
    //     "--head-text-align": "right",
    //     "--cell-text-align": "right",
    //   }}
    //   {...rest}
    // />
  );
};

const moneyDisplayStyles = {
  fontWeight: "500",
  fontSize: "16px",
};
