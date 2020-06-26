import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// mui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

// axios.defaults.baseURL =
//   "https://us-central1-playlist-73276.cloudfunctions.net/api";

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pass: "",
      loading: false,
      errors: {},
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.pass,
    };

    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //TODO: Error handling
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <Typography variant="h2" className={classes.PageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              label="Email"
              type="email"
              name="email"
              variant="filled"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              color="secondary"
            />
            <TextField
              id="pass"
              label="Password"
              type="password"
              name="pass"
              variant="filled"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.pass}
              onChange={this.handleChange}
              fullWidth
              color="secondary"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
          </form>
          <small>
            Dont have an account? Sign up <Link to="/signup"> here </Link>
          </small>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
