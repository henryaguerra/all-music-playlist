import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHORIZED } from "../types";

const initialState = {
  spotify_authenticated: false,
  authenticated: false,
  credentials: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHORIZED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
      };
    default:
      return state;
  }
}
