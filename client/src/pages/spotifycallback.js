import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginSpotifyUser } from "../redux/actions/userActions";

export class spotifycallback extends Component {
  componentDidMount() {
    console.log("component mounted: " + window.location.href);

    var parsed_url = window.location.href.split("=");
    var code = parsed_url[1].toString();

    console.log(code);

    const data = {
      code: code,
      uid: localStorage.getItem("uid"),
    };
    this.props.loginSpotifyUser(data);
    // this.props.history.push("/");
  }
  render() {
    return <div></div>;
  }
}

spotifycallback.propTypes = {
  loginSpotifyUser: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  loginSpotifyUser,
};

export default connect(null, mapActionsToProps)(spotifycallback);
