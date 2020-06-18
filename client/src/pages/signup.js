import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pass: "",
      confirmPass: "",
      loading: false,
      errors: {},
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.pass,
      confirmPassword: this.state.confirmPass,
    };
    console.log(userData.email);
    console.log(userData.password);
    console.log(userData.confirmPassword);

    this.props.signupUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  // TODO: Error handling
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
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              color="primary"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="pass"
              label="Password"
              type="password"
              name="pass"
              variant="outlined"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.pass}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmPass"
              label="Confirm Password"
              type="password"
              name="confirmPass"
              variant="outlined"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.confirmPass}
              onChange={this.handleChange}
              fullWidth
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
            <br></br>
            <small>
              Already have an account? Login<Link to="/login"> here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
// export default home
export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
