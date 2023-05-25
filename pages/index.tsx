import { Box, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
// import { useRouter } from "next/router";
import JaksehatMobileImg from "@assets/img/Jaksehat-Android-Low.webp";
import withLayouts from "@components/__hocs/withLayouts";
import Image from "next/image";
import { useRouter } from "next/router";

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
function App({user}: any) {
  const router = useRouter();
  const {status} = useSession();

  useEffect(() => {
    router.push("/app");
  }, [])

  return (
    <Stack paddingY={4}>
      {status === "loading" && <Box>Loading....</Box>}
      <Stack direction={{xs: "column-reverse", md: "row"}} flex={1} spacing={2}>
        <Stack flex={1} justifyContent="center" alignItems="center" textAlign="center">
          <Box>
            <Typography variant="h1" fontSize={{xs: "2rem", md: "3.5rem"}} color="green" fontWeight={600}>JAKSEHAT</Typography>
            <Typography variant="h2" fontSize={{xs: ".7rem", md: "1.5rem"}} color="GrayText" fontWeight={400}>Aplikasi layanan kesehatan untuk warga DKI Jakarta</Typography>
          </Box>
        </Stack>
        <Stack direction="row" flex={1} justifyContent="center">
          <Box width="50%">
            <Image src={JaksehatMobileImg} alt="jaksehat-mobile" layout="responsive" />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

// export const getServerSideProps = withAuthSSR(
//   async (context: any, user: any) => {
//     return user;
//   }
// );


App.getLayout = (page: any) =>
  withLayouts(page, {
    mode: "regular",
  });

export default App;
