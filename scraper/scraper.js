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
      console.log(index+": "+newData[index][0]);
      for (let dept of indexDept) {
        let found = false;
        if (index <= dept.lastIndex && !found) {
          //Make objects that don't exist yet
          if (!newannouncer[dept.dept][newData[index][0]])
            newannouncer[dept.dept][newData[index][0]] = {};
          if (!newannouncer[dept.dept][newData[index][0]][newData[index][1]])
            newannouncer[dept.dept][newData[index][0]][newData[index][1]] = [];

          newannouncer[dept.dept][newData[index][0]][newData[index][1]]
            .push([newData[index][2], null, newData[index][4]]);
          found = true;
        }
      }
    }

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
