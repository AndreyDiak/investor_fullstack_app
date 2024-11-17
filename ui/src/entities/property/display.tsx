import { TemplateProperty } from "@kit/entities";
import { Box, BoxProps, cn } from "@kit/ui";
import { forwardRef } from "react";

interface PropertyDisplayProps extends BoxProps {
  properties: TemplateProperty[];
}

export const PropertyDisplay = forwardRef<HTMLDivElement, PropertyDisplayProps>(
  ({ properties, className, ...rest }, ref) => {
    return (
      <Box ref={ref} className={cn("flex flex-col gap-4", className)} {...rest}>
        {properties.map((property) => (
          <Box key={property.name} className="flex justify-between">
            {property.name}
            {property.price}
          </Box>
        ))}
      </Box>
    );
  }
);
