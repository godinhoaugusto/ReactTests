import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layout/header";

import "./styles.css";

function App() {
  return (
    <Fragment>
      <Header title="test title" />
      <div className="App">
        <h2>Test React</h2>
      </div>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
