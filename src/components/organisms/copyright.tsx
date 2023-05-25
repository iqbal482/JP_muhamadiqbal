import { Typography } from "@mui/material";
import Link from "next/link";

/**
 * 描述
 * @date 2022-09-11
 * @param {any} props
 * @return {any}
 */
export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link href="https://dinkes.jakarta.go.id/" color="white">
        Dinas Kesehatan DKI Jakarta
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
