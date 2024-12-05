import { Box } from "@kit/ui";
import { useEffect } from "react";
import { useTemplateStore } from "../../api/template";
import { useStoreFetch } from "../../shared/hooks";
import { TemplateCard } from "./_components/template_card";

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
        background: `
        linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),
        url(/public/menu.jpeg)
    `,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
      }}
    >
      {templates?.map((template) => {
        return <TemplateCard key={template.job.name} template={template} />;
      })}
    </Box>
  );
};
