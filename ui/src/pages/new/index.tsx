import { Box } from "@gravity-ui/uikit";
import { Fragment, useEffect } from "react";
import { useTemplateStore } from "../../api/template";
import { useStoreFetch } from "../../shared/hooks";

export const NewGamePage = () => {
  const {
    data: templates,
    loading,
    error,
    fetch,
  } = useStoreFetch(useTemplateStore((state) => state.fetch));

  // const handleTemplateSelect = useCallback((template: GameTemplate) => {
  //   setSearchParams((curr) => {
  //     curr.set("templateId", template._id);
  //     return curr;
  //   });
  // }, []);

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return "Loading...";
  }

  return (
    <Box
      css={{
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(to top right, var(--color-indigo) 30%, var(--color-emerald) 70%)",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
      }}
    >
      {templates?.map((template) => (
        <Fragment>game template modal</Fragment>
        // <DialogWrapper placement="top" size="large">
        //   <DialogTrigger css={{ display: "flex", flexDirection: "column" }}>
        //     <TemplateCard key={template.job.name} template={template} />
        //   </DialogTrigger>
        //   <DialogContent>
        //     <TemplatePreviewDialog template={template} />
        //   </DialogContent>
        // </DialogWrapper>
      ))}
    </Box>
  );
};
