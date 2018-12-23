import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCountry } from "../services/countryServies";
import { connect } from "react-redux";
import { createCountry, updateCountry } from "../actions/countryActions";
import { withRouter } from "react-router";

class CountryForm extends Form {
  state = {
    data: {
      name: ""
    },
    errors: {}
  };

  schema = {
    id: Joi.number(),
    name: Joi.string()
      .required()
      .label("Name")
  };

  async populateCountry() {
    try {
      const countryId = this.props.match.params.id;
      if (countryId === "new") return;

      const { data: country } = await getCountry(countryId);
      this.setState({ data: this.mapToViewModel(country) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(country) {
    return {
      id: country.id,
      name: country.name
    };
  }

  componentDidMount() {
    this.populateCountry();
  }

  async doSubmit() {
    const countryId = this.props.match.params.id;
    if (countryId === "new") await this.props.createCountry(this.state.data);
    else await this.props.updateCountry(this.state.data);

    this.props.history.push("/countries");
  }

  render() {
    return (
      <div>
        <h1>Country Form</h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("name", "Name", "text")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { createCountry, updateCountry }
  )(CountryForm)
);
