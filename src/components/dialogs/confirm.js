import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SlideUp, ZoomIn } from "../transitions";

const ConfirmDlg = props => {
  const [open, setOpen] = React.useState(true);
  const { title, contentText, confirm } = props;
  const onCancel = () => {
    confirm(false);
    setOpen(false);
  };
  const onConfirm = () => {
    confirm(true);
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={ZoomIn}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDlg;
