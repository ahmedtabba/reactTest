import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authUserAction } from "../../actions/authActions";

class ProtectedRoute extends Component {
  componentDidMount() {
    this.props.authUserAction();
  }

  render() {
    const { path, component: Component, render, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={() => {
          if (!this.props.user)
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: this.props.location }
                }}
              />
            );
          return Component ? <Component {...this.props} /> : render(this.props);
        }}
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
)(ProtectedRoute);
