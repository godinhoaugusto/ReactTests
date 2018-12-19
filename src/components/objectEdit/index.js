import React from "react";
import { JSONEditor } from "../JSONEditor";
import CreateKeyDialog from "./createKeyDialog";
import ConfirmDlg from "../dialogs/confirm";
import "./styles.css";

let currentKey = {};

const ObjEditor = props => {
  const [openEditor, setOpenEditor] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const onJsonChange = (key, value, parent, data) => {
    console.log(key, value, parent, data);
  };
  const deleteKey = (key, parent, data) => {
    currentKey = { key, parent, data };
    setOpenConfirm(true);
    console.log(key, parent, data);
  };
  const addKey = (key, parent, data) => {
    //console.log(key, parent, data);

    currentKey = { key, parent };
    console.log(currentKey);
    setOpenEditor(true);

    // parent[key]["new key"] = "";
  };

  const confirm = res => {
    if (res) {
      let { key, parent } = currentKey;
      delete parent[key];
    }
    setOpenConfirm(false);
    currentKey = {};
  };
  const closeEditor = res => {
    setOpenEditor(false);

    let { key, parent } = currentKey;
    let value = null;
    if (res != null) {
      console.log(res);
      if (res.value == "{}") {
        value = {};
      } else if (res.value == "{}") {
        value = [];
      } else {
        value = res.value;
      }
      parent[key][res.key] = value;
    }
    currentKey = {};
    //console.log(currentKey);
  };
  return (
    <React.Fragment>
      <JSONEditor data={props.obj} collapsible cloneData={false} deleteKey={deleteKey} addKey={addKey} onChange={onJsonChange} />
      <CreateKeyDialog open={openEditor} onCloseEditor={closeEditor} />
      {openConfirm && <ConfirmDlg title="Warning!" contentText="Delete selected key?" confirm={confirm} />}
    </React.Fragment>
  );
};

export default React.memo(ObjEditor);
