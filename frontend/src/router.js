import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './containers/home'
import List from './containers/list'
import Json from './containers/json'
import Base64 from './containers/base64'
import Regard from './containers/regard'

export default function Routes() {
    return (
      <Router>
        <Route exact path="/" component={Home}>
        </Route>
        <Route path="/list" component={List}>
        </Route>
        <Route path="/json" component={Json}>
        </Route>
        <Route path="/base64" component={Base64}>
        </Route>
        <Route path="/regard" component={Regard}>
        </Route>
      </Router>
    );
}
