import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

class Navbar extends Component {
  render() {
    // return (
    //   <AppBar color="secondary">
    //     <Toolbar className="nav-container">
    //       <IconButton aria-label="Home" size="medium" component={Link} to="/">
    //         <HomeIcon fontSize="inherit" style={{ fill: "white" }} />
    //       </IconButton>

    //       <Grid
    //         container
    //         alignItems="flex-start"
    //         justify="flex-end"
    //         direction="row"
    //       >
    //         <Button color="primary" component={Link} to="/login">
    //           Login
    //         </Button>
    //         <Button color="primary" component={Link} to="/signup">
    //           Signup
    //         </Button>
    //         <Button color="primary" component={Link} to="/logout" hide="true">
    //           Logout
    //         </Button>
    //       </Grid>
    //     </Toolbar>
    //   </AppBar>
    // );

    if (this.props.authenticated === true) {
      return (
        <AppBar color="secondary">
          <Toolbar className="nav-container">
            <IconButton aria-label="Home" size="medium" component={Link} to="/">
              <HomeIcon fontSize="inherit" style={{ fill: "white" }} />
            </IconButton>

            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
            >
              <Button color="primary" component={Link} to="/logout">
                Logout
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      );
    } else {
      return (
        <AppBar color="secondary">
          <Toolbar className="nav-container">
            <IconButton aria-label="Home" size="medium" component={Link} to="/">
              <HomeIcon fontSize="inherit" style={{ fill: "white" }} />
            </IconButton>

            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
            >
              <Button color="primary" component={Link} to="/login">
                Login
              </Button>
              <Button color="primary" component={Link} to="/signup">
                Signup
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

Navbar.propTypes = {
  user: PropTypes.object,
};

// export default Navbar;

export default connect(mapStateToProps)(Navbar);
