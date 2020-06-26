import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import axios from "axios";

// pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import spotifycallback from "./pages/spotifycallback";

// components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

// Mui
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import themeFile from "./util/theme";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser } from "./redux/actions/userActions";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch({ type: SET_AUTHENTICATED });
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route path="/spotify-callback" component={spotifycallback} />
                <Route path="/spotify-callback" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
