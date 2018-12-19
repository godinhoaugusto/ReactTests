import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SlideUp, ZoomIn } from "../transitions";

const CreateKeyDialog = props => {
  const [key, setKey] = React.useState("");
  const [value, setValue] = React.useState("");
  function create() {
    props.onCloseEditor({ key, value });
  }
  function cancel() {
    props.onCloseEditor(null);
  }
  return (
    <Dialog open={props.open} onClose={null} TransitionComponent={ZoomIn} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Object Key</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the Key and Value ([] - Array, {"{} - Object"})</DialogContentText>
        <TextField autoFocus multiline margin="dense" id="key" label="Key" type="text" value={key} onChange={e => setKey(e.target.value)} fullWidth />
        <TextField multiline margin="dense" id="value" label="Value" type="text" value={value} onChange={e => setValue(e.target.value)} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disabled={key !== "" && value !== "" ? false : true} onClick={create} color="secondary">
          Create
        </Button>
        <Button variant="contained" onClick={cancel} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateKeyDialog;
