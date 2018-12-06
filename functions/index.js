const functions = require('firebase-functions');
const fs = require('fs');
const rp = require('request-promise');
const tough = require('tough-cookie');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.updateSeats = functions.https.onRequest((req, res) => {
  //TODO get live seats from lowell-course-selection and update Firebase


  let cookie = new tough.Cookie({
      key: ".ASPXAUTH",
      value: functions.config().updateseats.arenacookie,
      domain: "www.lowell-courseselection.org",
      httpOnly: true,
  });

  var cookiejar = rp.jar();
  cookiejar._jar.rejectPublicSuffixes = false;
  cookiejar.setCookie(cookie.toString(), 'http://www.lowell-courseselection.org');

  var options = {
      method: "GET",
      uri: 'http://www.lowell-courseselection.org/',
      jar: cookiejar,
      // resolveWithFullResponse: true
      transform: function (body) {
          return cheerio.load(body);
      }
  };

  rp(options)
    .then(function($) {
      cheerioTableparser($);
      var table = $("table").parsetable();
      var newData = table[0].map((col, i) => table.map(row => row[i]));
      //Remove the [Course,Teacher,Block,Code,seatsremaining]
      newData.splice(0,1);
      var newannouncer = {
        "Math":{},
        "Science":{},
        "English":{},
        "Social Studies":{},
        "VPA":{},
        "World Language":{},
        "PE":{},
        "Other":{}
      };
      let indexDept = [
        {lastIndex:109, dept:"Math"},
        {lastIndex:196, dept:"Science"},
        {lastIndex:295, dept:"English"},
        {lastIndex:388, dept:"Social Studies"},
        {lastIndex:431, dept:"VPA"},
        {lastIndex:506, dept:"World Language"},
        {lastIndex:547, dept:"PE"},
        {lastIndex:newData.length, dept:"Other"}
      ];
      for (let index in newData) {
        for (let dept of indexDept) {
          if (index <= dept.lastIndex && !found) {
            //Make objects that don't exist yet
            if (!newannouncer[dept.dept][newData[index][0]])
              newannouncer[dept.dept][newData[index][0]] = {};
            if (!newannouncer[dept.dept][newData[index][0]][newData[index][1]])
              newannouncer[dept.dept][newData[index][0]][newData[index][1]] = [];

            newannouncer[dept.dept][newData[index][0]][newData[index][1]]
              .push([newData[index][2], null, newData[index][4]]);
            break;
          }
        }
      }
      //Send the data!!!
      res.set({
        'Access-Control-Allow-Origin':'*'
      });
      res.status(200).send(JSON.stringify(newannouncer));
      return;
    }).catch(function(err){
      res.status(500).send("There's been an error with the scraper. \n"+err);
    });
});
