import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import moment from "moment";

export const DatePickerBlock = (props: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={props.value || moment()}
        shouldDisableDate={(day) => day.weekday() === 0}
        minDate={moment().add(0, "days")}
        maxDate={moment().add(14, "days")}
        onChange={(newValue) => {
          props.onChange(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
