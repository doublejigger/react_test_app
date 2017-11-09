import * as React from "react";
import {Provider} from "react-redux";
import {Router, Route, Switch} from "react-router";
import AppHistory from "./history";
import Store from "./store";
import ContactList from "./components/contact-list";
import ContactNew from "./components/contact-new";
import ContactEdit from "./components/contact-edit";

import "react-select/dist/react-select.css";
import "notie/dist/notie.css";

import "./less/contact-list.less";
import "./less/costants.less";

export default() => (
  <Provider store={Store}>
    <Router history={AppHistory}>
      <Switch>
        <Route exact path="/" component={ContactList}/>
        <Route path="/new" component={ContactNew}/>
        <Route path='/edit/:contactId' component={ContactEdit}/>
      </Switch>
    </Router>
  </Provider>
);