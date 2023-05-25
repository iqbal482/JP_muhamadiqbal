import { withAuthSSR } from "@components/__hocs/with-auth-ssr";
import React from "react";
import { Stack, Typography } from "@mui/material";
import CardsApps from "@components/organisms/CardApps";
import RsudIcon from "@components/atoms/svg/rsud";
// import PkcIcon from "@components/atoms/svg/pkc";
import withLayouts from "@components/__hocs/withLayouts";

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
function App({user}: any): JSX.Element {
  return (
    <Stack spacing={4}>
      <Typography variant="h6" fontWeight={400}>Layanan Kesehatan</Typography>
      <Stack spacing={2}>
        <CardsApps href="/registration" title="E-Registasi Fasilitas Kesehatan" subtitle="Pendaftaran Kunjungan RSUD atau PUSKESMAS" icon={<RsudIcon fontSize="large" />} bgColor="green" color="whitesmoke" />
        {/* <CardsApps href="/registration" title="E-Registasi Puskesmas" subtitle="Pendaftaran Kunjungan Puskesmas" icon={<PkcIcon fontSize="large" />} bgColor="green" color="whitesmoke" /> */}
      </Stack>
    </Stack>
  );
}

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return user;
  }
);
App.getLayout = (page: any) =>
  withLayouts(page, {
    mode: "mobile",
  });


export default App;
