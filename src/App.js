import "../node_modules/bulma/css/bulma.min.css";
import "./App.css";

import globalContext from "./context/global-context";
import { Switch } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from './components/nav/nav';
import Floors from './views/floors/floors';
import Roles from './views/roles/roles';
import Lines from "./views/lines/lines";
import Stoppages from "./views/stoppages/stoppages";
import Links from "./views/links/links";
import Users from "./views/users/users";
import UserLinks  from "./views/user-link/user-link";
import UserLines from "./views/user-line/user-line";
import React, { useContext, useMemo } from "react";
import LineControl from "./views/line-controls/line-controls";

function App() {
  const fetchGlobalContext = useContext(globalContext);
  const globalContextLocal= useMemo(()=>fetchGlobalContext,[fetchGlobalContext]);
  const pageBody = globalContextLocal.authorization.token ? (<div style={{margin:'auto'}}>
  <Switch>
  <Route exact path="/roles" ><Roles/></Route>
  <Route exact path="/floors" ><Floors/></Route>
  <Route exact path="/lines" ><Lines/></Route>
  <Route exact path="/roles" ><Roles/></Route>
  <Route exact path="/stoppages" ><Stoppages/></Route>
  <Route exact path="/links" ><Links/></Route>
  <Route exact path="/users" ><Users/></Route>
  <Route exact path="/user-links" ><UserLinks/></Route>
  <Route exact path="/user-lines" ><UserLines/></Route>
  <Route exact path="/line-controls" ><LineControl/></Route>
  </Switch>
  </div>) : null;
  console.log(globalContextLocal,pageBody);
  return (
      <BrowserRouter>
        <Nav />
        {pageBody}
      </BrowserRouter>
  );
}

export default React.memo(App);
