import { Accordion, AccordionDetails, AccordionProps, AccordionSummary as MuiAccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionSummaryProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type AccordionSummaryType = {
  backgroundColor?: string;
  icon?: React.ReactNode;
} & AccordionSummaryProps;

type AccordionType = {
  title?: string;
  icon?: React.ReactNode;
} & AccordionProps;

export const AccordionSummary = styled(
  ({ backgroundColor, icon, ...props }: AccordionSummaryType) => (
    <MuiAccordionSummary expandIcon={icon || <ExpandMoreIcon />} {...props} />
  )
)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : theme.palette.secondary.light,
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

export const AccordionComponent = ({ title, icon, ...props }: AccordionType) => {
  return (
    <Accordion {...props}>
      <AccordionSummary
        expandIcon={icon || <ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{mt: 1}}>{props.children}</AccordionDetails>
    </Accordion>
  );
};