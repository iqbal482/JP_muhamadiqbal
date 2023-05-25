import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const RadioInput = (props: any) => {
  return (
    <>
      <FormControl sx={{ m: 3 }} error={props.error} variant="standard">
        <FormLabel id="demo-error-radios">{props.label}</FormLabel>
        <RadioGroup
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        >
          {props.options.map((option: any, idx: number) => (
            <FormControlLabel
              key={idx}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        {props.error && <FormHelperText>{props.helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};
