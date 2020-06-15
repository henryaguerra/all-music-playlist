const { db } = require('../util/admin');
const { user } = require('firebase-functions/lib/providers/auth');

const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
}
var exists = "playlist name already exists, please change it and try again";
exports.getPlaylists = (req, res) => {

    const playlists = {};

    db
        .collection('users')
        .doc(req.user.email)
        .collection('playlists')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                var doc_name = doc.id;
                playlists[doc_name] = doc.data();
                console.log("name: " + doc.id + " data: " + doc.data());
            })
            return res.status(200).json(playlists);
        })
        .catch(err => {
            return res.status(500).json({error: err});
        })

}

exports.addPlaylist = (req, res) => {
    
    // Check empty playlist name
    if(isEmpty(req.body.playlist_name)){
        return res.status(400).json({error: "playlist name cannot be empty"});
    }

    // Check for empty playlist
    if(Object.keys(req.body.playlist).length == 0){
        return res.status(400).json({error: "playlist cannot be empty"});
    }   

    var playlist_count_path = "users/" + req.user.email;
    var new_playlist_path = 'users/' + req.user.email + '/playlists/'
                                + req.body.playlist_name;

    console.log(new_playlist_path);
    // Check for playlist limit reached
    db
        .doc(playlist_count_path)
        .get()
        .then(doc => {

            var playlist_count = doc.data().playlist_count;

            // playlist limit check
            if(doc.data().playlist_count >= 2){
                return res.status(403).json({error: "playlist limit reached"});
            }

            // check for playlist name existence
            db
                .doc(new_playlist_path)
                .get()
                .then(doc => {

                    // return if playlist name exists
                    if(doc.exists){
                        console.log(doc.id);
                        console.log(doc.data());
                        return res.status(409).json({conflict: exists});
                    }

                    // Add new playlist to database if authorized
                    db
                        .doc(new_playlist_path)
                        .set(req.body.playlist)
                        .then(() => {

                            // Set playlist count var only after promise 
                            db
                                .doc(playlist_count_path)
                                .update({playlist_count: ++playlist_count})
                                .then(() => {
                                    res.status(201).json(
                                        {message: `playlist created`}
                                    );
                                })
                                .catch(err => {
                                    return {error: err};
                                })
                        })
                        .catch(err => {
                            return {error: err}
                        });

                })
                .catch(err => {
                    console.log("error in getting playlist doc")
                })

           
        })
        .catch(err => {
            if(res.headerSent){
                console.log("headers have been sent already");
            }
            else{
                return res.status(403).json(err);
            }
        });
}

// add to playlist
exports.addToPlaylist = (req, res) => {

    // Add new playlist to database if authorized
    var playlist_path = 'users/' + req.user.email + '/playlists/' 
                            + req.body.playlist_name;
    db
        .doc(playlist_path)
        .update(req.body.playlist)
        .then(() => {
            return res.status(201).json(
                {message: "playlist update successful"}
            );
        })
        .catch(err => {
            return res.status(500).json({error: err});
    });
}

// delete from playlist
exports.deleteFromPlaylist = (req, res) => {

    // req body will have the playlist name and songs to add
    var playlist_path = 'users/' + req.user.email + '/playlists/' 
                            + req.body.playlist_name;

    var deleted_songs = {};
    
    // get current playlists
    db
        .doc(playlist_path)
        .get()
        .then((doc) => {

            var playlist = doc.data();
            var non_existent = {};
            
            // delete songs from existing data if they exist in data
            for(song in req.body.playlist){
                if(playlist.hasOwnProperty(song)){
                    delete playlist[song];
                }
                else{
                    non_existent[song] = "";
                }
            }

            db
                .doc(playlist_path)
                .set(playlist)
                .then(() => {
                    return res.status(200).json({
                        message: "removed songs from playlist",
                        non_existent
                    });
                })
                .catch(err => {
                    return err;
                });
            
        })
        .catch(err => {
            return res.status(500).json({error: err});
        });
}

// delete entire playlist
exports.deletePlaylist = (req, res) => {

    var playlist_path = 'users/' + req.user.email + '/playlists/'
                            + req.body.playlist_name;
    var playlist_count_path = "users/" + req.user.email;
    console.log(playlist_count_path);
    db
        .doc(playlist_path)
        .delete()
        .then(() => {

            // Using transactions to read and write simpler
            let userRef = db.doc(playlist_count_path);
            db.runTransaction(transaction => {
                return transaction
                    .get(userRef)
                    .then(doc => {
                        let playlist_count = doc.data().playlist_count;
                        transaction
                            .update(userRef, 
                                {playlist_count: --playlist_count}
                            );
                    });
            })
            .then(() => {
                return res.status(200).json({message: "playlist deleted"});
            })
            .catch(err => {
                return err;
            });
        })
        .catch(err => {
            return res.status(400).json({error: err});
        });
}