import React from "react";
import { Route, Switch } from "react-router-dom";
import MappedList from "./MappedList";
import OrgList from "./OrgList";
import History from "./History";
export default function Dashboard(props) {
  return (
    <div>
      <Switch>
        <Route exact path={`/connected/`} component={MappedList} />
        <Route exact path={`/connected/Planning`} component={OrgList} />
        <Route exact path={`/connected/History`} component={History} />
      </Switch>
    </div>
  );
}
