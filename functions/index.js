const functions = require('firebase-functions');
const admin = require('firebase-admin');

const liveseatsFunction = require('./liveseats');
const histscrapFunction = require('./histscrap');
const popupFunction = require('./popup');

exports.liveseats = functions.https.onRequest((req, res) => {
  liveseatsFunction.updateSeats(req, res);
});
exports.histscrap = functions.https.onRequest((req, res) => {
  histscrapFunction.saveSeats(req, res);
});
exports.popup = functions.https.onRequest((req, res) => {
  popupFunction.displayPop(req, res);
});
