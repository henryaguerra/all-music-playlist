const functions = require('firebase-functions');


const express = require('express');
const app = express();

const config = require('./util/config');
const FBAuth = require('./util/fbAuth');


const { signup, login } = require('./handlers/users');
const { getPlaylists, addPlaylist, addToPlaylist, deleteFromPlaylist, deletePlaylist } = require('./handlers/playlists');



// user routes
app.post('/signup', signup);
app.post('/login', login);

// Playlist routes
// TODO: change getPlaylists to return playlists and songs after finishing addPlaylists request
app.get('/getPlaylists', FBAuth, getPlaylists);
app.post('/addPlaylist', FBAuth, addPlaylist);
app.post('/addToPlaylist', FBAuth, addToPlaylist);
app.post('/deleteFromPlaylist', FBAuth, deleteFromPlaylist);
app.post('/deletePlaylist', FBAuth, deletePlaylist);

// TODO: Remove testing routes
const { db } = require('./util/admin');

// post test route
app.post('/test', FBAuth, (req, res) => {
    

    // request body looks like this:
    // { playlist_name, playlist: { song: uri ... }}

    var path = 'users/' + req.user.email + '/playlists/' + req.body.playlist_name;

    db
        .doc(path)
        .set(req.body.playlist)
        .then(() => {
            res.json({message: `document created`});
        })
        .catch(err => {
            res.status(400).json({message: err});
        });
});

// get test route
app.get('/test', FBAuth, (req, res) => {


    db
        .collection('users')
        .doc(req.user.email)
        .collection('playlists')
        .get()
        .then(snapshot => {

            snapshot.forEach(doc => {
                console.log(doc.data());
            })
            return res.status(200).json({message: "success"});
        })
        .catch(err => {
            return res.status(500).json({error: err});
        })
})

exports.api = functions.https.onRequest(app);
