import { BottomNavigation, BottomNavigationAction, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { AccountCircle, Home, MenuBook } from "@mui/icons-material";

/**
 * Description placeholder
 * @date 10/13/2022 - 10:38:05 AM
 *
 * @return {*}
 */
export default function BottomNav() {
  const [value, setValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if(router) {
      let val = 0
      const curr = router.pathname
      console.log(router, curr.match(/(\/auth)|(\/profile)/g))
      if (!!curr.match(/(\/auth)|(\/profile)/g)) {
        val = 2
      }
      else if (!!curr.match(/\/kunjungan/g)) {
        val = 1
      }
      else if (!!curr.match(/\/app/g)) {
        val = 0
      }
      console.log(val);
      setValue(val);
    }
  }, [router])

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        console.log(newValue, "--change")
        setValue(newValue);
      }}
      sx={{width: "100%"}}
    >
      <BottomNavigationAction label="Home" icon={<Link component={NextLink} href="/app"><Home /></Link>} />
      <BottomNavigationAction label="Kunjungan" icon={<Link component={NextLink} href="/kunjungan"><MenuBook /></Link>} />
      <BottomNavigationAction label="Profile" icon={<Link component={NextLink} href="/profile"><AccountCircle /></Link>} />
    </BottomNavigation>
  )
}
