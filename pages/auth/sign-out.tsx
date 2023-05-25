import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import * as React from "react";

/**
 * 描述
 * @date 2022-09-11
 * @return {React.Component}
 */
export default function SignIn() {

  return (
    <Button onClick={() => signOut()}>Logout</Button>
  );
}