import React, { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import KunjunganList from "@components/organisms/KunjunganList";
import { withAuthSSR } from "@components/__hocs/with-auth-ssr";
import withLayouts from "@components/__hocs/withLayouts";
import { API } from "@configs";

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
function Kunjungan({ showAlert }: any) {
  const [dataFromServer, setDataFromServer] = React.useState([]);
  const getData = async () => {
    const res = await new API(null, '/api/')
      .post("fetcher")
      .payload({
        url: "v1-mobile/appointments",
        payload: {
          with: 'medicalFacility',
          sort: 'date',
          limit: 10,
        },
        method: "get",
      })
      .fetch();

    const { data, error } = res.data;
    
    if (data && !error) {
      setDataFromServer(data.data);
      console.log(data.data)
    } else {
      showAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  }

  const deleteData = async (id:string) => {
    const res = await new API(null, '/api/')
      .post("fetcher")
      .payload({
        url: "/v1-mobile/appointments/"+id+"",
        
        method: "delete",
      })
      .fetch();

    const { data, error } = res.data;
    
    if (data && !error) {
      getData();
      console.log(data.data)
    } else {
      showAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Stack spacing={3}>
      <Typography variant="h6" fontWeight={400}>
        Jadwal Kunjungan
      </Typography>
      <KunjunganList datas={dataFromServer} cancel={deleteData}/>
    </Stack>
  );
}

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return user;
  }
);

Kunjungan.getLayout = (page: any) =>
  withLayouts(page, {
    mode: "mobile",
  });

export default Kunjungan;
