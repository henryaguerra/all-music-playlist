import {
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHORIZED,
  SET_SPOTIFY_AUTHENTICATED,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      console.log(res);
      setAuthHeader(res.data.token, res.data.refreshToken);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const signupUser = (userSignupInfo, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", userSignupInfo)
    .then((res) => {
      setAuthHeader(res.data.token, res.data.uid);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHORIZED });
};

const setAuthHeader = (token, uid) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  localStorage.setItem("uid", uid);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const loginSpotifyUser = (data) => (dispatch) => {
  // The getSpotifyTokens backend call will return a 1 hour access token,
  // the refresh token is stored in the database and never reaches the client
  // for security purposes
  axios
    .post("/getSpotifyTokens", data)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("spotifyToken", res.data.token);
    })
    .catch((err) => {
      console.log(err);
    });
};
