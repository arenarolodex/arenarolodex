const functions = require('firebase-functions');
const fs = require('fs');
const rp = require('request-promise');
const tough = require('tough-cookie');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');

exports.updateSeats = functions.https.onRequest((req, res) => {
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
          return cheerio.load(body, {
            decodeEntities: false
          });
      }
  };

  rp(options)
    .then(($) => {
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
        "World Languages":{},
        "Physical Education":{},
        "Other/Learning Services":{},
        "Lunch":{}
      };
      let indexDept = [
        {lastIndex:114, dept:"Math"},
        {lastIndex:200, dept:"Science"},
        {lastIndex:302, dept:"English"},
        {lastIndex:395, dept:"Social Studies"},
        {lastIndex:447, dept:"VPA"},
        {lastIndex:522, dept:"World Languages"},
        {lastIndex:565, dept:"Physical Education"},
        {lastIndex:603, dept:"Other/Learning Services"},
        {lastIndex:604, dept:"Lunch"},
        {lastIndex:622, dept:"Other/Learning Services"},
        {lastIndex:623, dept:"Lunch"},
        {lastIndex:635, dept:"Other/Learning Services"},
        {lastIndex:636, dept:"Lunch"},
        {lastIndex:newData.length, dept:"Other/Learning Services"}
      ];
      for (let index in newData) {
        // console.log(index+": "+newData[index][0]);
        if (newData[index][0] === "") continue;

        for (let dept of indexDept) {
          if (index <= dept.lastIndex) {
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
    }).catch((err) => {
      console.error(new Error("There's been an error with the scraper. \n"+err));
      res.status(500).send("There's been an error with the scraper. \n"+err);
    });
});
