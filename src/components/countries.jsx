import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authUserAction } from "../actions/authActions";
import {
  getCountriesAction,
  deleteCountryAction
} from "../actions/countryActions";

class Countries extends Component {
  state = {};

  componentWillMount() {
    this.props.getCountriesAction();
    this.props.authUserAction();
  }

  handelUpdate = country => {};

  handelDelete = async countryId => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      this.props.deleteCountryAction(countryId);
    }
  };
  render() {
    const count = this.props.countries.length;
    const { user } = this.props;

    if (count === 0) return <p>There is no Countries.</p>;
    return (
      <React.Fragment>
        <ToastContainer position="top-center" />
        {user && (
          <Link
            to="/countries/new"
            className="btn btn-primary my-3 btn-sm"
            style={{ marginBottom: 20 }}
          >
            New Country
          </Link>
        )}
        <table className="table table-hover ">
          <thead>
            <tr>
              <th>Name</th>

              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.countries.map(c => (
              <tr key={c.id}>
                <td style={{ verticalAlign: "middle" }}>{c.name}</td>
                <td style={{ textAlign: "right" }}>
                  <Link
                    to={`/countries/${c.id}`}
                    className="btn btn-secondary btn-sm m-3"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => this.handelDelete(c.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  countries: state.countries.items,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getCountriesAction, deleteCountryAction, authUserAction }
)(Countries);
