import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ObjEditor from "../../components/objectEdit";
let traducao = {
  languages: {
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
  }
};

const Translate = props => {
  return (
    <div style={{ padding: 5 }}>
      <Paper style={{ width: "100%", padding: 15, marginTop: 10 }}>
        <Typography variant="subtitle1" color="secondary" style={{ flexGrow: 1 }}>
          Translation
        </Typography>
        <ObjEditor obj={traducao} />
      </Paper>
    </div>
  );
};
export default Translate;
