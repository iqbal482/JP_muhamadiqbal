import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";

export const CheckBox = (props: any) => {
  return (
    <FormControl
      {...props}
      error={props.error}
      component="fieldset"
      sx={{ m: 3 }}
      variant="standard"
    >
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup>
        {props.options.map((option: any, idx: number) => (
          <FormControlLabel
            key={idx}
            control={
              <Checkbox
                checked={props.value == option.value}
                onChange={props.OnChange}
                name={props.name}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {props.error && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
};
