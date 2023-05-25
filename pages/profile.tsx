import React from "react";
import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { withAuthSSR } from "@components/__hocs/with-auth-ssr";
import { Email, Phone, Verified } from "@mui/icons-material";
import moment from "moment";
import withLayouts from "@components/__hocs/withLayouts";
import Link from "next/link";
import CreateIcon from "@mui/icons-material/Create";
/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
function Profile({ user }: any) {

  return (
    <Stack flex={1} justifyContent="space-between">
      <Stack spacing={2}>
        <Typography sx={{display: "flex",justifyContent:"space-between"}} variant="h6" fontWeight={400}>
          My Profile
          <Link href="/edit-profile"><CreateIcon /></Link>
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {user?.profile?.name && (
            <Avatar {...stringAvatar(user?.profile?.name)} />
          )}
          <Stack>
            <Typography variant="subtitle1">{user?.profile?.name}</Typography>
            <Typography variant="body2" color="#AAAAAA">
              {user?.profile?.nik}
            </Typography>
          </Stack>
        </Stack>
        <Divider variant="inset" />
        <Stack direction="row" spacing={2} alignItems="center">
          <Email color="disabled" />
          <Typography variant="body2" color="#AAAAAA">
            {user?.email}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Phone color="disabled" />
          <Typography variant="body2" color="#AAAAAA">
            {user?.profile?.phone}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Verified color="disabled" />
          <Typography variant="body2" color="#AAAAAA">
            {moment(user?.email_verified_at).format("LLL")}
          </Typography>
        </Stack>
      </Stack>
      <Button color="error" onClick={() => signOut()}>
        Logout
      </Button>
    </Stack>
  );
}

export const getServerSideProps = withAuthSSR(
  async (context: any, user: any) => {
    return user;
  }
);

// eslint-disable-next-line require-jsdoc
function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: "grey",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
Profile.getLayout = (page: any) => withLayouts(page, {
  mode: "mobile"
});

export default Profile