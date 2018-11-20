import React from "react";
import { Route } from "react-router-dom";

const ApiRoutes = () => (
  <React.Fragment>
    <Route exact path="/api/" render={() => '{msg:"hello"}'} />
    <Route path="/api/login" render={() => '{msg:"hello"}'} />
  </React.Fragment>
);

export { ApiRoutes };
