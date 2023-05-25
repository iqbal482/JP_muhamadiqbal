import {
  Autocomplete
} from "@mui/material";
import { Input } from "@atoms/input";

export const AutocompleteBox = (props: any) => {
  return (
    <Autocomplete
      onChange={props.onChange}
      disablePortal
      options={props.options}
      getOptionLabel={(option: any) => option[props.optionLabel] || option.label}
      renderInput={(params) => (
        <Input
          {...params}
          onChange={props.onChange}
          name={props.name}
          label={props.label}
          error={props.error ? true : false}
          helperText={props.helperText}
        />
      )}
    />
  );
};
