import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";

class BranchesTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: branch => (
        <Link to={`/branches/${branch.id}`}>{branch.name}</Link>
      )
    },
    { path: "location", label: "Location" },
    { path: "description", label: "Description" }
  ];

  deleteColumn = {
    key: "delete",
    content: branch => (
      <button
        onClick={() => this.props.onDelete(branch)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user /* && user.isAdmin*/) this.columns.push(this.deleteColumn);
  }

  render() {
    const { branches, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={branches}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BranchesTable;
