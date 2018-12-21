import React, { Component } from "react";
import { getCountries, deleteCountry } from "../services/countryServies";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

class Countries extends Component {
  state = {
    countries: []
  };

  async componentDidMount() {
    try {
      const { data: countries } = await getCountries();
      this.setState({ ...this.state, countries });
    } catch (ex) {}
  }

  handelUpdate = country => {};

  handelDelete = async countryId => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      const origenalState = this.state.countries;
      try {
        const countries = this.state.countries.filter(c => c.id !== countryId);
        this.setState({ ...this.state, countries });
        console.log(countryId);

        await deleteCountry(countryId);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          toast.error("This country has already been deleted.");

        if (ex.response && ex.response.status === 400)
          toast.error(ex.response.data.message);

        // window.alert(ex.response.data.message);
        this.setState({ origenalState });
      }
    }
  };
  render() {
    console.log(this.state.countries);

    const count = this.state.countries.length;
    const { user } = this.props;
    console.log(user);

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
            {this.state.countries.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <button
                    onClick={() => this.handelDelete(c.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/countries/${c.id}`}
                    className="btn btn-secondary btn-sm m-3"
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Countries;
