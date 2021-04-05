import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './containers/programing/home'
import List from './containers/programing/list'
import Json from './containers/programing/json'
import Base64 from './containers/programing/base64'
import Regard from './containers/programing/regard'
import Cron from './containers/programing/cron'
import Binary from './containers/programing/binary'
import TextComparison from './containers/programing/text_comparison'
import ClassGenerator from './containers/programing/class_generator'
import SimpleSavingsCalculator from './containers/financial/simple_savings_calculator'
import SavingsCalculator from './containers/financial/savings_calculator'
import Calculator from './containers/financial/calculator'
import LoanCalculator from './containers/financial/loan_calculator'

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
        <Route path="/cron" component={Cron}>
        </Route>
        <Route path="/binary" component={Binary}>
        </Route>
        <Route path="/textComparison" component={TextComparison}>
        </Route>
        <Route path="/classGenerator" component={ClassGenerator}>
        </Route>
        <Route path="/simpleSavingCalculator" component={SimpleSavingsCalculator}>
        </Route>
        <Route path="/savingCalculator" component={SavingsCalculator}>
        </Route>
        <Route path="/calculator" component={Calculator}>
        </Route>
        <Route path="/loanCalculator" component={LoanCalculator}>
        </Route>
      </Router>
    );
}
