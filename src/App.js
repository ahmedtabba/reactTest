import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Branches from "./components/branches";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import BranchForm from "./components/branchForm";
import Countries from "./components/countries";
import CountryForm from "./components/countryForm";
import store from "./store";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <NavBar />
          <main className="container">
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <ProtectedRoute path="/branches/:id" component={BranchForm} />
              <ProtectedRoute path="/countries/:id" component={CountryForm} />
              <Route
                path="/branches"
                render={props => <Branches {...props} />}
              />
              <Route
                path="/countries"
                render={props => <Countries {...props} />}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/branches" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
