import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { getBranches } from "../services/branchServices";
import Roles from "../models/roles";

class RegisterForm extends Form {
  state = {
    data: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      branchId: "",
      roleName: ""
    },
    branches: [],
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    confirmPassword: Joi.string()
      .required()
      .min(5)
      .label("Confirm Password"),
    fullname: Joi.string()
      .required()
      .label("Username"),
    branchId: Joi.required().label("Branch"),
    roleName: Joi.required().label("Role Name")
  };

  doSubmit = async () => {
    try {
      console.log(this.state.data);
      console.log("555555");

      const response = await userService.register(this.state.data);
      console.log("responser", response);
      auth.login(this.state.data.email, this.state.data.password);

      // auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  async componentDidMount() {
    console.log(Roles);

    const { data: branches } = await getBranches();
    this.setState({ branches });
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("confirmPassword", "Confirm Password", "password")}
          {this.renderInput("fullname", "Full Name", "text")}
          {this.renderSelect(
            "branchId",
            "Branch",
            this.state.branches,
            "id",
            "name"
          )}
          {this.renderSelect("roleName", "Role Name", Roles, "name", "name")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
