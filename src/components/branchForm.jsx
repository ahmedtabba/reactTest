import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getBranch, saveBranch } from "../services/branchServices";

class BranchForm extends Form {
  state = {
    data: {
      name: "",
      location: "",
      description: ""
    },
    errors: {}
  };

  schema = {
    id: Joi.number(),
    name: Joi.string()
      .required()
      .label("Name"),
    location: Joi.string()
      .required()
      .label("Location"),
    description: Joi.string()
      .required()
      .label("Description")
  };

  async populateBranch() {
    try {
      const branchId = this.props.match.params.id;
      if (branchId === "new") return;

      const { data: branch } = await getBranch(branchId);
      this.setState({ data: this.mapToViewModel(branch) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateBranch();
  }

  mapToViewModel(branch) {
    return {
      id: branch.id,
      name: branch.name,
      location: branch.location,
      description: branch.description
    };
  }

  doSubmit = async () => {
    await saveBranch(this.state.data);

    this.props.history.push("/branches");
  };

  render() {
    return (
      <div>
        <h1>Branch Form</h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("location", "Location")}
          {this.renderInput("description", "Description")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BranchForm;
