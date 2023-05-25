import { Button, Divider, Grid, Paper, Stack, SwipeableDrawer, Typography } from "@mui/material"
import moment from "moment"
import { useState } from "react"

type KunjunganListProps = {
  datas: any[]
  cancel: (id: string) => void
}

/**
 * Description placeholder
 * @date 10/16/2022 - 10:01:21 PM
 *
 * @param {KunjunganListProps} {datas}
 * @return {*}
 */
export default function KunjunganList({datas,cancel}: KunjunganListProps) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  
  return (
    <>
      <Stack width="100%" spacing={2}>
        {datas &&
          datas.map((item, idx) => (
            <Paper
              key={idx}
              elevation={1}
              onClick={() => {
                setSelectedIndex(idx);
                setOpen(true);
              }}
              sx={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <Stack
                sx={{ background: "linear-gradient(45deg, #1C6758, blue);" }}
              >
                <Grid container alignItems="center">
                  <Grid container item xs={2} sm={1} justifyContent="center">
                    <Typography
                      textAlign="center"
                      variant="caption"
                      color="white"
                      fontSize={10}
                      textTransform="uppercase"
                      fontWeight={700}
                    >
                      {moment().format("d MMM y")}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sm={11}
                    bgcolor="whitesmoke"
                    py="10px"
                    pl="0.8rem"
                  >
                    <Typography variant="subtitle1">
                      {item.booking_code}
                    </Typography>
                    <Typography variant="subtitle1">
                      {item.id_number}
                    </Typography>
                    <Typography variant="body2" color="GrayText">
                      {item.medical_facility.name}
                    </Typography>
                    <Typography variant="body2" color="GrayText">
                      {item.poly_name}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          ))}
        {/* {datas && datas.map((item, idx) => (
        <CardsApps  key={idx} href="/" title={""}
          subtitle={
            <Stack bgcolor="pink">
              <Grid container wrap="wrap" alignItems="center" >
                <Grid item xs={1} bgcolor="blueviolet">
                  <Typography variant="caption" color="GrayText">{moment(item?.date).format("d MMM y")}</Typography>
                </Grid>
                <Grid item xs={10} bgcolor="greenyellow">
                  <Typography variant="subtitle1">{item.booking_code}</Typography>
                  <Typography variant="subtitle1">{item?.id_number}</Typography>
                  <Typography variant="body2" color="GrayText">{item?.medical_facility?.name} - {item?.poly_name}</Typography>
                </Grid>
              </Grid>
            </Stack>
          }
          bgColor="whitesmoke"
        />
      ))} */}
      </Stack>
      {datas.map((data: any, idx: number) => (
        <SwipeableDrawer
          key={idx}
          disableSwipeToOpen
          anchor={"bottom"}
          open={open && selectedIndex === idx}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <Stack width="100%" spacing={2}>
            <Stack sx={{ background: "smokewhite", py: "20px", px: "20px" }}>
              <Typography
                variant="body2"
                sx={{ mb: "10px", fontWeight: "700" }}
              >
                Detail Tiket Kunjungan {data.id}
              </Typography>
              <Divider
                sx={{ mt: "5px", mb: "20px", background: "gray" }}
              ></Divider>
              <Typography
                variant="body2"
                color="graytext"
                sx={{ mb: "10px", fontWeight: "500" }}
              >
                Detail Fasilitas Kesehatan
              </Typography>
              <Grid container sx={{ fontWeight: "100" }}>
                <Grid xs={6}>
                  <Typography variant="body2" color="GrayText">
                    Kode Booking
                  </Typography>
                  <Typography variant="body2" color="GrayText">
                    Jenis Fasilitas Kesehatan
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    Fasilitas Kesehatan
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    Poliklinik
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    Tanggal Kunjungan
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    Jam Kunjungan
                  </Typography>
                </Grid>
                <Grid xs={6} textAlign="right">
                  <Typography variant="body2" color="graytext">
                    {data.booking_code}
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    {data.medical_facility.type}
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    {data.medical_facility?.name}
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    {data.poly_name}
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    {moment(data.date).format("D MMMM y")}
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    {data.queue_number}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: "20px" }}></Divider>
              <Typography
                variant="body2"
                color="graytext"
                sx={{ mb: "10px", fontWeight: "500" }}
              >
                Detail Pasien
              </Typography>
              <Grid container>
                <Grid xs={6}>
                  <Typography variant="body2" color="graytext">
                    Nama Rekam Medis
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    Jenis Pasien
                  </Typography>
                </Grid>
                <Grid xs={6} textAlign="right">
                  <Typography variant="body2" color="graytext">
                    {data.id_number}
                  </Typography>
                  <Typography variant="body2" color="graytext">
                    {data.health_insurance}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                onClick={() => {cancel(data.id)}}
                variant="contained"
                color="error"
                sx={{ mt: "200px", mb: "30px" }}
              >
                Batalkan Kunjungan
              </Button>
            </Stack>
          </Stack>
        </SwipeableDrawer>
      ))}
    </>
  );
}