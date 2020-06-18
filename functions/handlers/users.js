const { db } = require("../util/admin");

const config = require("../util/config");
const firebase = require("firebase");
firebase.initializeApp(config);

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  let errors = {};

  if (newUser.password != newUser.confirmPassword) {
    return res.status(400).json({ error: "passwords to not match " });
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      db.collection("users").doc(newUser.email).set({
        uid: data.user.uid,
        playlist_count: 0,
      });

      data.user.getIdToken().then((token) => {
        return res.status(201).json({ token: token });
      });
    })

    // TODO: Clean this up and make it work
    .catch((err) => {
      console.error(err);

      if (err.code === "auth/email-already-exists") {
        errors.email = "Email already exists";
      }

      if (err.code === "auth/invalid-email") {
        errors.email = "Invalid Email";
      }

      if (err.code === "auth/invalid-password") {
        errors.password = "Invalid Password";
      }

      if (newUser.password != newUser.confirmPassword) {
        errors.password = "Passwords must match";
      }

      if (err.code === "auth/weak-password") {
        errors.password = "Password must be 6 or more characters long";
      }

      return res.status(500).json({ message: err });
    });
};

exports.login = (req, res) => {
  const info = {
    email: req.body.email,
    password: req.body.password,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(info.email, info.password)

    .then((user) => {
      user.user.getIdToken().then((token) => {
        return res.status(200).json({ token: token });
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
