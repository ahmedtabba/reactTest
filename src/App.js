import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Branches from "./components/branches";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import BranchForm from "./components/branchForm";
import Countries from "./components/countries";
import CountryForm from "./components/countryForm";

class App extends Component {
  state = {};

  componentDidMount() {
    auth.getCurrentUser().then(res => {
      let user = res;
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/branches/:id" component={BranchForm} />
            <ProtectedRoute path="/countries/:id" component={CountryForm} />
            <Route
              path="/branches"
              render={props => <Branches {...props} user={this.state.user} />}
            />
            <Route
              path="/countries"
              render={props => <Countries {...props} user={this.state.user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/branches" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
