import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import MUIDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { FC, useState } from "react";
import { SxProps } from "@mui/material";

type Props = {
  buttonStyle?: SxProps;
  buttonText: string;
  title: string;
  yesButtonStyle?: SxProps;
  noButtonStyle?: SxProps;
  action: Function;
};

const Dialog: FC<Props> = ({
  buttonStyle,
  buttonText,
  title,
  yesButtonStyle,
  noButtonStyle,
  action,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <MenuItem sx={buttonStyle} onClick={handleOpen}>
        {buttonText}
      </MenuItem>
      <MUIDialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              action();
              handleClose();
            }}
            sx={yesButtonStyle}
          >
            Oui
          </Button>
          <Button onClick={handleClose} sx={noButtonStyle}>
            Non
          </Button>
        </DialogActions>
      </MUIDialog>
    </>
  );
};

export default Dialog;
