import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const DoctorList = (props:any) => {
  const handleTimeChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    props.onTimeSelected(index, props.value)
  }

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {props.datas.map((value: any, index: number) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <Box key={index}>
            <ListItem
              secondaryAction={
                props.icon && (
                  <IconButton edge="end" aria-label="comments">
                    {props.icon}
                  </IconButton>
                )
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={() => {
                  props.onSelected(value)
                  if(value.times.length > 0){
                   props.onTimeSelected(0, value.times[0])
                  }
                }}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={props.selected?.id == value.id || false}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItemButton>
            </ListItem>
            {(props.selected?.id == value.id && value.times.length > 0) && (
              <TimeLists
                times={value.times}
                timeChecks={props.selectedTime}
                handleTimeChange={handleTimeChange}
              />
            )}
          </Box>
        );
      })}
    </List>
  );
}

const TimeLists = (props: any) => {
  const { times, timeChecks, handleTimeChange } = props;
  console.log(times)
  return (
    <List sx={{ marginLeft: '16px', width: "100%", bgcolor: "background.paper" }}>
      {times && times.map((value: any, index: number) => {
        const labelId = `checkbox-list-time-label-${index}`;

        return (
          <ListItem
            key={index}
            secondaryAction={
              props.icon && (
                <IconButton edge="end" aria-label="comments">
                  {props.icon}
                </IconButton>
              )
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={() => handleTimeChange(index, value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={timeChecks == index || false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
                {props.selected?.id == value.id && <TimeLists />}
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${value.start_time} - ${value.end_time} (Sisa: ${value.quota_left} quota)`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
