import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { connect } from "react-redux";
import { authUserAction } from "../actions/authActions";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };
  user = null;
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      this.props.authUserAction();
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response);

        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (this.user) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
  componentDidMount() {
    auth.getCurrentUser().then(res => {
      let currentUser = res;
      this.user = currentUser;
    });
  }
}

export default connect(
  null,
  { authUserAction }
)(LoginForm);
