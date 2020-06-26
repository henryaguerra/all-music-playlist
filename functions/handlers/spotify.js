const SpotifyWebApi = require("spotify-web-api-node");
const creds = require("../util/spotifyConfig");
var request = require("request");
const fetch = require("fetch");

exports.getSpotifyPlaylist = (req, res) => {
  var spotifyapi = new SpotifyWebApi(creds);

  spotifyapi.clientCredentialsGrant().then(
    (data) => {
      spotifyapi.setAccessToken(data.body["access_token"]);
      spotifyapi.getPlaylistTracks("6JYqre3BBuPhE88JpkIGeQ").then(
        (data) => {
          return res.status(200).json(data.body);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    (err) => {
      return res.status(500).json({ error: err });
    }
  );
};

// input params include code and uid of user
// returns spotify token in the token field
exports.getSpotifyTokens = (req, res) => {
  const code = req.body.code;
  const uid = req.body.uid;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: creds.redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(creds.clientId + ":" + creds.clientSecret).toString(
          "base64"
        ),
    },
    json: true,
  };

  request.post(authOptions, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      var access_token = body.access_token;
      var refresh_token = body.refresh_token;

      return res.status(200).json({ token: access_token });
    } else {
      console.log(response);
      return res.status(400).json({ error: "error getting access token" });
    }
  });
};
