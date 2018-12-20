import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handelSubmit = e => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handelChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  validate = () => {
    const { data } = this.state;
    const options = { abortEarly: false };
    const result = Joi.validate(data, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        onChange={this.handelChange}
        label={label}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, items, valueProperty, displayProperty) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        onChange={this.handelChange}
        label={label}
        error={errors[name]}
        items={items}
        valueProperty={valueProperty}
        displayProperty={displayProperty}
      />
    );
  }
}

export default Form;
