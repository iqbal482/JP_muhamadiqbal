import { SvgIcon, SvgIconProps } from "@mui/material";
import RsudSvg from "src/assets/icon/svg/Reg-rs.svg";

/**
 * Description placeholder
 * @date 10/16/2022 - 11:39:07 PM
 *
 * @return {*}
 */
export default function RsudIcon({...props}: SvgIconProps) {
  return <SvgIcon {...props}>
    <RsudSvg />
  </SvgIcon>
}