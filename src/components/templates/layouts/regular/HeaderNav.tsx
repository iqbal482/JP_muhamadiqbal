import { Box, Container, Stack, Link } from "@mui/material";
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
    <Stack height="fit-content" width="100%" justifyContent="center" alignContent="space-between" paddingY={2.5} borderBottom="solid .5px #eaeaea">
      <Container sx={{display: "flex",alignItems: "center", justifyContent:"space-between"}}>
        <Box width="10rem"><Image src={JaksehatLogo} alt="logo" layout="responsive"></Image></Box>
        <Link href="/profile" variant="body2" underline="none" sx={{fontSize:17}}>Masuk</Link>
      </Container>
    </Stack>
  )
}