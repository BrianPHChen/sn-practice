const functions = require("firebase-functions");
const express = require('express');
const app = express();
const FBAuth = require('./util/fbAuth');
const { getAllscreams, postOneScream} = require('./handlers/screams');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');

// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

// screams routes
app.get('/screams', getAllscreams);
app.post('/scream', FBAuth, postOneScream);
// app.get('/scream/:screamId', getScream);
// TODO deleteScream
// TODO likeScream
// TODO unlikeScream
// TODO commentScream

exports.api = functions.https.onRequest(app);