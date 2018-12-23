import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import Roles from "../models/roles";
import { connect } from "react-redux";
import { getBranches } from "../actions/branchActions";
import PropTypes from "prop-types";

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
    branchId: Joi.string()
      .required()
      .label("Branch"),
    roleName: Joi.string()
      .required()
      .label("Role Name")
  };

  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
      auth.login(this.state.data.email, this.state.data.password);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  async componentWillMount() {
    this.props.getBranches();
  }

  render() {
    const branches = this.props.branches;

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("confirmPassword", "Confirm Password", "password")}
          {this.renderInput("fullname", "Full Name", "text")}
          {this.renderSelect("branchId", "Branch", branches, "id", "name")}
          {this.renderSelect("roleName", "Role Name", Roles, "name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  getBranches: PropTypes.func.isRequired,
  branches: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  branches: state.branches.items
});

export default connect(
  mapStateToProps,
  { getBranches }
)(RegisterForm);
