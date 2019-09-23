import React from "react";
import { Switch, Route } from "react-router-dom";

//People
import People from "../pages/people";
import PeopleDetails from "../pages/people/details";
//Starships
import Starships from "../pages/starships";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={People} />
    <Route exact path="/people" component={People} />
    <Route exact path="/people/details/:id" component={PeopleDetails} />
    <Route exact path="/starships" component={Starships} />
  </Switch>
);

export default Routes;
