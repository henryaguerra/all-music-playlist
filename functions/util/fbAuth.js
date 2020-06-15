const { admin } = require('../util/admin');

module.exports = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else{
        return res.status(403).json({error: "Unauthorized"});
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            // return db
            //     .collection('users')
            //     .doc(req.user.email)
            //     .get();
            return next();
        })
        // .then(data => {
        //     req.user.uid = data.docs[0].data().uid;
        //     return next();
        // })
        .catch(err => {
            res.status(403).json(err);
        })

}