import { Box, Button } from "@mui/material";

export const WizardStepAction = (props: any) => {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Button
          variant={props.variant}
          color="error"
          onClick={props.onPrev}
          disabled={props.isFirstStep}
          sx={{ mr: 1 }}
        >
          Prev
        </Button>
        <Button
          disabled={!props.canNext}
          variant={props.variant}
          onClick={props.isLastStep ? props.onFinish : props.onNext}
        >
          {!props.isLastStep ? `Next` : `Finish`}
        </Button>
      </Box>
    </div>
  );
}