import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BranchesTable from "./branchesTable";
import Pagination from "./common/pagination";
import { getBranches, deleteBranch } from "../services/branchServices";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Branches extends Component {
  state = {
    branches: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const { data: branches } = await getBranches();
    this.setState({ branches });
  }

  handleDelete = async branch => {
    if (window.confirm("Are you sure you wish to delete this branch?")) {
      const originalBranches = this.state.branches;
      const branches = originalBranches.filter(b => b.id !== branch.id);
      this.setState({ branches });

      try {
        await deleteBranch(branch.id);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          toast.error("This branch has already been deleted.");

        if (ex.response && ex.response.status === 400)
          toast.error(ex.response.data.message);

        // window.alert(ex.response.data.message);
        this.setState({ branches: originalBranches });
      }
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
    const {
      pageSize,
      currentPage,
      sortColumn,

      searchQuery,
      branches: allBranches
    } = this.state;

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
    const { length: count } = this.state.branches;
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

export default Branches;
