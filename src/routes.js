import React from "react";
import { Switch, Route } from "react-router-dom";
import Pages from "./pages";

const Routes = () => {
  return (
    <Switch>
      <Route path="/signup" component={Pages.Signup} />
      <Route path="/login" component={Pages.Login} />
      <Route path="/profile" component={Pages.Profile} />
      <Route exact path="/" component={Pages.Home} />
    </Switch>
  );
};

export default Routes;
