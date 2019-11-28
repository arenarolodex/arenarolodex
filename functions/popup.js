const functions = require('firebase-functions');
const fs = require('fs');
const rp = require('request-promise');
const tough = require('tough-cookie');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
// const ObjToCsv = require('objects-to-csv');

exports.displayPop = functions.https.onRequest((req, res) => {
  let cookie = new tough.Cookie({
      key: ".ASPXAUTH",
      value: functions.config().displaypop.arenacookie,
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
      // var newannouncer = {
      //   "Math":{},
      //   "Science":{},
      //   "English":{},
      //   "Social Studies":{},
      //   "VPA":{},
      //   "World Language":{},
      //   "PE":{},
      //   "Other":{},
      //   "Lunch":{}
      // };
      // let indexDept = [
      //   {lastIndex:110, dept:"Math"},
      //   {lastIndex:197, dept:"Science"},
      //   {lastIndex:299, dept:"English"},
      //   {lastIndex:390, dept:"Social Studies"},
      //   {lastIndex:440, dept:"VPA"},
      //   {lastIndex:518, dept:"World Language"},
      //   {lastIndex:559, dept:"PE"},
      //   {lastIndex:610, dept:"Other"},
      //   {lastIndex:611, dept:"Lunch"},
      //   {lastIndex:626, dept:"Other"},
      //   {lastIndex:628, dept:"Lunch"},
      //   {lastIndex:647, dept:"Other"},
      //   {lastIndex:649, dept:"Lunch"},
      //   {lastIndex:newData.length, dept:"Other"}
      // ];
      // for (let index in newData) {
      //   // console.log(index+": "+newData[index][0]);
      //   if (newData[index][0] === "") continue;

      //   for (let dept of indexDept) {
      //     if (index <= dept.lastIndex) {
      //       //Make objects that don't exist yet
      //       if (!newannouncer[dept.dept][newData[index][0]])
      //         newannouncer[dept.dept][newData[index][0]] = {};
      //       if (!newannouncer[dept.dept][newData[index][0]][newData[index][1]])
      //         newannouncer[dept.dept][newData[index][0]][newData[index][1]] = [];

      //       newannouncer[dept.dept][newData[index][0]][newData[index][1]]
      //         .push([newData[index][2], null, newData[index][4]]);
      //       break;
      //     }
      //   }
      // }

      var newannouncer;
      var datastring;
      
      newData.forEach((infoArray, index) => {
        index++;
        datastring = infoArray.join(",");
        newannouncer += datastring + "\n";
      });


      // var newannouncer = JSON.stringify(newData);
      // newannouncer.replace("[[", "");
      // newannouncer.replace("],[", "\n");
      // newannouncer.replace("]]", "");
      // newannouncer.replace("\"", "");

      //Send the data!!!
      res.set({
        'Access-Control-Allow-Origin':'*'
      });
      res.status(200).send(datastring);
      return;
    }).catch((err) => {
      console.error(new Error("There's been an error with the scraper. \n"+err));
      res.status(500).send("There's been an error with the scraper. \n"+err);
    });
});
