import { SvgIcon, SvgIconProps } from "@mui/material";
import IconSvg from "src/assets/icon/svg/Reg-pkc.svg";

/**
 * Description placeholder
 * @date 10/16/2022 - 11:39:07 PM
 *
 * @return {*}
 */
export default function PkcIcon({...props}: SvgIconProps) {
  return <SvgIcon {...props}>
    <IconSvg />
  </SvgIcon>
}