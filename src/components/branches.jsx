import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BranchesTable from "./branchesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBranches, deleteBranch } from "../actions/branchActions";
import { authUserAction } from "../actions/authActions";

class Branches extends Component {
  state = {
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" }
  };

  componentWillMount() {
    this.props.authUserAction();
    this.props.getBranches();
  }

  handleDelete = branch => {
    if (window.confirm(`Are you sure you want to DELETE ${branch.name} ?`)) {
      this.props.deleteBranch(branch.id);
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const allBranches = this.props.branches;

    let filtered = allBranches;
    if (searchQuery)
      filtered = allBranches.filter(b =>
        b.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const branches = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: branches };
  };

  render() {
    const { length: count } = this.props.branches;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no branches in the database.</p>;

    const { totalCount, data: branches } = this.getPagedData();

    return (
      <div className="row">
        <ToastContainer position="top-center" />
        <div className="col">
          {user && (
            <Link
              to="/branches/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Branch
            </Link>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <BranchesTable
            branches={branches}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

Branches.propTypes = {
  getBranches: PropTypes.func.isRequired,
  branches: PropTypes.array.isRequired,
  deleteBranch: PropTypes.func.isRequired,
  user: PropTypes.object,
  authUserAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  branches: state.branches.items,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getBranches, deleteBranch, authUserAction }
)(Branches);
