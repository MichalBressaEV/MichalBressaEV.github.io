import { Button } from "@mui/material";
type Click = {
  onClick: () => void;
};

export const TriggerButton = ({ onClick }: Click) => {
  return (
    <Button onClick={onClick} variant="contained">
      Add card
    </Button>
  );
};
