import React, { Component } from "react";
import { Link } from "react-router-dom";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {/* <Button color="inherit" component={Link} to="/">
            Home
          </Button> */}
          <IconButton aria-label="Home" size="medium" component={Link} to="/">
            <HomeIcon fontSize="inherit" style={{ fill: "white" }} />
          </IconButton>

          <Grid
            container
            alightItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
