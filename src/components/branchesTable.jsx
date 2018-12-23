import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import { authUserAction } from "../actions/authActions";
import { connect } from "react-redux";

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

  componentWillMount() {
    this.props.authUserAction();
    if (this.props.user /* && user.isAdmin*/)
      this.columns.push(this.deleteColumn);
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
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { authUserAction }
)(BranchesTable);
