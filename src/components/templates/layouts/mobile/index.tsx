import React from "react";
import BottomNav from "./BottomNav";
import { Box, Paper, Stack, StackProps } from "@mui/material";
import HeaderNav from "./HeaderNav";

interface LayoutsProps extends StackProps {
  withFooter?: boolean,
  withHeader?: boolean,
}

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
export default function MobileLayouts({withFooter = true, withHeader = true, children, ...rest}: LayoutsProps) {
  return (
    <Stack id="__mobileView" bgcolor="white" {...rest} height={rest.height || "100vh"} width={rest.width || "100%"} position="relative">
      {withHeader && <HeaderNav />}
      <Box display="flex" flex={1} width="100%" padding={{xs: "1rem", sm: "1rem 2rem"}}  overflow="scroll" flexDirection="column">
          {children}
      </Box>
      {withFooter && <Box flex={0} display="flex" width="100%" position="relative">
        <Paper sx={{ position: 'sticky', bottom: 0, left: 0, right: 0, display: "flex", flex: 1 }}>
          <BottomNav />
        </Paper>
      </Box>}
    </Stack>
  );
}