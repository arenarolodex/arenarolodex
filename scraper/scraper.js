const http = require('http');
const fs = require('fs');
const rp = require('request-promise');
const tough = require('tough-cookie');
var cheerio = require('cheerio'),
    cheerioTableparser = require('cheerio-tableparser');


let cookie = new tough.Cookie({
    key: ".ASPXAUTH",
    value: process.env.ARENACOOKIE,
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
      {lastIndex:85, dept:"Math"},
      {lastIndex:149, dept:"Science"},
      {lastIndex:283, dept:"English"},
      {lastIndex:391, dept:"Social Studies"},
      {lastIndex:501, dept:"VPA"},
      {lastIndex:574, dept:"World Language"},
      {lastIndex:601, dept:"PE"},
      {lastIndex:newData.length, dept:"Other"}
    ];
    // console.log(newData[198][0]);

    for (let index in newData) {
      // console.log(index+": " + newData[index][0]);
      if (newData[index][0] === "") continue;

      if (newData[index][2] > 9 && newData[index][2] < 19) {
        newData[index][3] = "1";
        newData[index][2] = JSON.stringify(newData[index][2]-10);
      } else if (newData[index][2] > 20 && newData[index][2] < 29) {
        newData[index][3] = "2";
        newData[index][2] = JSON.stringify(newData[index][2]-20);
      } else if (newData[index][2] < 9) {
        newData[index][3] = "Both";
      }

      for (let dept of indexDept) {
        if (index <= dept.lastIndex) {
          //Make objects that don't exist yet
          if (!newannouncer[dept.dept][newData[index][0]])
            newannouncer[dept.dept][newData[index][0]] = {};
          if (!newannouncer[dept.dept][newData[index][0]][newData[index][1]])
            newannouncer[dept.dept][newData[index][0]][newData[index][1]] = [];

          newannouncer[dept.dept][newData[index][0]][newData[index][1]]
            .push([newData[index][2], newData[index][3], newData[index][4]]);
          break;
        }
      }
    }
    // console.log(newData[4]);

    //Write newannouncer.json
    const announcerData = new Uint8Array(Buffer.from(JSON.stringify(newannouncer)));
    fs.writeFile('newannouncer.json', announcerData, (err) => {
      if (err) throw err;
      console.log("newannouncer.json has been written.");
    });
  }).catch(function(err){
      console.log("There was an error");
      console.log(err);
  });
