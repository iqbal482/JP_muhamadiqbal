import { FormControl, TextField } from "@mui/material";

export const Input = (props: any) => {
  return (
    <FormControl sx={{ mb: 1.5, width: '100%' }} error={props.error} variant="standard">
      <TextField
        inputProps={props.inputProps}
        error={props.error}
        label={props.label}
        defaultValue={props.defaultValue}
        value={props.value}
        helperText={props.helperText}
        name={props.name}
        {...props}
      />
    </FormControl>
  );
};
