import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginSpotifyUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

export class home extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    var scopes = "user-modify-playback-state";
    var client_id = "01859cfc18544523a3fb883bb7b6016c";
    var authlink =
      "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      client_id +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent("http://localhost:3000/spotify-callback");

    window.location = authlink;

    // this.props.loginSpotifyUser(this.props.history);
  }
  render() {
    if (this.props.authenticated && this.props.spotify_authenticated) {
      return (
        <React.Fragment>
          <TextField
            id="import_playlist"
            label="Please paste playlist link here"
            variant="outlined"
            size="small"
            fullWidth
          ></TextField>
        </React.Fragment>
      );
    } else if (this.props.authenticated && !this.props.spotify_authenticated) {
      return <Button onClick={this.onClick}>Connect to spotify</Button>;
    } else {
      return <h1>Please signup or login to use this app</h1>;
    }
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  spotify_authenticated: state.user.spotify_authenticated,
});

const mapActionsToProps = {
  loginSpotifyUser,
};

home.propTypes = {
  user: PropTypes.object,
  loginSpotifyUser: PropTypes.func,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
