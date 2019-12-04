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
        "Other":{},
        "Learning Services":{},
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
        {lastIndex:566, dept:"Other"},
        {lastIndex:569, dept:"Learning Services"},
        {lastIndex:570, dept:"Other"},
        {lastIndex:584, dept:"Learning Services"},
        {lastIndex:585, dept:"Other"},
        {lastIndex:586, dept:"Learning Services"},
        {lastIndex:587, dept:"Other"},
        {lastIndex:590, dept:"Learning Services"},
        {lastIndex:591, dept:"Other"},
        {lastIndex:602, dept:"Learning Services"},
        {lastIndex:603, dept:"Other"},
        {lastIndex:604, dept:"Lunch"},
        {lastIndex:612, dept:"Learning Services"},
        {lastIndex:622, dept:"Other"},
        {lastIndex:623, dept:"Lunch"},
        {lastIndex:626, dept:"Learning Services"},
        {lastIndex:635, dept:"Other"},
        {lastIndex:636, dept:"Lunch"},
        {lastIndex:642, dept:"Learning Services"},
        {lastIndex:644, dept:"Other"},
        {lastIndex:645, dept:"Learning Services"},
        {lastIndex:653, dept:"Other"},
        {lastIndex:662, dept:"Learning Services"},
        {lastIndex:663, dept:"Other"},
        {lastIndex:664, dept:"Learning Services"},
        {lastIndex:674, dept:"Other"},
        {lastIndex:680, dept:"Learning Services"},
        {lastIndex:newData.length, dept:"Other"}
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
