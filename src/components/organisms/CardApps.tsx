import React, { ReactElement, ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import NextLink, { LinkProps } from "next/link";

interface CardsAppsProps extends LinkProps {
  title: string,
  subtitle?: string | ReactNode,
  icon?: ReactElement,
  bgColor?: string,
  color?: string,
}

/**
 * Description placeholder
 * @date 10/16/2022 - 10:53:14 PM
 *
 * @export
 * @param {CardsAppsProps} {title, subtitle, icon, ...linkProps}
 * @return {*}
 */
export default function CardsApps({title, subtitle, icon, bgColor = "white", color="black", ...linkProps}: CardsAppsProps) {
  return (
    <Stack style={{cursor: "pointer"}} padding="1.5rem 1rem" bgcolor={bgColor} color={color} borderRadius="15px">
        <NextLink {...linkProps}>
          <Stack direction="row" spacing={2} alignItems="center">
            {icon}
            <Box width="100%">
              <Typography>{title}</Typography>
              {typeof subtitle === "string" && <Typography variant="caption">{subtitle}</Typography>}
              {typeof subtitle === "object" && subtitle}
            </Box>
          </Stack>
        </NextLink>
      </Stack>
  )
}