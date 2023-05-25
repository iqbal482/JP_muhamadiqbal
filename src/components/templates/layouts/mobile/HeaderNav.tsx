import { Box, Stack } from "@mui/material";
import Image from "next/image";
import JaksehatLogo from "src/assets/logos/jaksehat.png"

/**
 * Description placeholder
 * @date 10/16/2022 - 9:31:40 PM
 *
 * @export
 * @return {*}
 */
export default function HeaderNav() {
  return (
    <Stack height="fit-content" width="100%" justifyContent="center" alignContent="space-between" paddingX={{xs: "1rem", sm: "2rem"}} paddingY={2} borderBottom="solid .5px #eaeaea">
      <Box width="10rem"><Image src={JaksehatLogo} alt="logo" layout="responsive"></Image></Box>
    </Stack>
  )
}