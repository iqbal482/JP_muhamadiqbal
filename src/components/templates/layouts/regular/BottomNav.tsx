import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { Copyright } from "@organisms";
import Link from "next/link";

/**
 * Description placeholder
 * @date 10/13/2022 - 10:38:05 AM
 *
 * @return {*}
 */
export default function BottomNav() {

  return (
    <Container>
      <Stack width="100%" paddingY="2rem" bgcolor="white" color="white" direction={{xs: "column", sm: "column", md: "row"}} justifyContent={{xs: "center", md: "space-between"}} spacing={{xs: 4, md: 0}}>
          <Stack direction={{xs: "column", sm: "column", md: "row"}} justifyContent={{xs: "center", md: "start"}} alignItems={{xs: "center", md: "center"}} spacing={{xs: 0, md: 2}} color="#808080" fontSize={14}>
            <Copyright fontStyle="unset" color="GrayText" />
            <Link href="https://dinkes.jakarta.go.id">
              <Typography color="inherit" fontSize="inherit">Website</Typography>
            </Link>
            <Link href="/privacy-policy">
              <Typography color="inherit" fontSize="inherit">Privacy Policy</Typography>
            </Link>
          </Stack>
          <Stack direction="row" justifyContent={{xs: "center", md: "start"}} spacing={1} color="#808080" fontSize={30}>
            <Link href="https://www.instagram.com/dinkesdki">
              <Instagram color="inherit" fontSize="inherit" />
            </Link>
            <Link href="https://www.facebook.com/dinkesdki">
              <Facebook color="inherit" fontSize="inherit" />
            </Link>
            <Link href="https://twitter.com/dinkesJKT">
              <Twitter color="inherit" fontSize="inherit" />
            </Link>
            <Link href="https://www.youtube.com/c/dinkesdkijakarta">
              <YouTube color="inherit" fontSize="inherit" />
            </Link>
          </Stack>
      </Stack>
    </Container>
  )
}
