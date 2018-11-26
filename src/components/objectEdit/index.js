import React from "react";
import { JSONEditor } from "../JSONEditor";
import "./styles.css";

const ObjEditor = props => {
  const onJsonChange = (key, value, parent, data) => {
    console.log(key, value, parent, data);
  };
  return (
    <JSONEditor
      data={{
        en: {
          translations: {
            "To get started, edit <1>src/App.js</1> and save to reload.": "To get started, edit <1>src/App.js</1> and save to reload.",
            "Welcome to React": "Welcome to React and react-i18next"
          }
        },
        de: {
          translations: {
            "To get started, edit <1>src/App.js</1> and save to reload.": "Starte in dem du, <1>src/App.js</1> editierst und speicherst.",
            "Welcome to React": "Willkommen bei React und react-i18next"
          }
        }
      }}
      collapsible
      onChange={onJsonChange}
      view="dual"
    />
  );
};

export default ObjEditor;
