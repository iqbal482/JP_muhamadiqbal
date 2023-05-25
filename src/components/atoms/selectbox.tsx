import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export const SelectBox = (props: any) => {
  return (
    <FormControl sx={{ width: '100%', mb: 1.5 }} error={props.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        required={props.required}
        value={props.value}
        label={props.label}
        onChange={props.onChange}
      >
        <MenuItem>
          <em>{`-- Select ${props.label} --`}</em>
        </MenuItem>
        {props.options.map((option: any, idx: number) => (
          <MenuItem key={idx} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
};
