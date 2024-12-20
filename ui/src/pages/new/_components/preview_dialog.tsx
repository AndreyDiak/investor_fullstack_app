import { GameTemplate } from "@kit/entities";
import { Box, DialogBody, DialogHeader, DialogHeading } from "@kit/ui";
import { Fragment } from "react";
import { CreditsTable } from "../../../shared/ui/credits_table";

export const TemplatePreviewDialog = ({
  template,
}: {
  template: GameTemplate;
}) => {
  return (
    <Fragment>
      <DialogHeader css={{ backgroundColor: "rgba(53, 145, 148, 0.1)" }}>
        <DialogHeading>{template.job.name}</DialogHeading>
      </DialogHeader>
      <DialogBody>
        <Box
          css={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Box>
            <img
              src={template.job.imgUrl}
              alt="Person Job Image"
              css={{
                width: "300px",
                height: "400px",
                borderRadius: "0.5rem",
              }}
            />
          </Box>
          <CreditsTable
            credits={template.credits}
            css={{
              "--cell-content-align": "right",
            }}
          />
        </Box>
        <Box css={{ display: "flex", width: "100%", justifyContent: "center" }}>
          {/* <Button variant="primary" css={{ margin: "0 auto" }}>
            Начать игру
          </Button> */}
        </Box>
      </DialogBody>
    </Fragment>
  );
};
