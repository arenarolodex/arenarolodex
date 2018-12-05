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
        return cheerio.load(body);
    }
};


var jason;
rp(options)
    .then(function($) {
        cheerioTableparser($);
        var data = $("table").parsetable();
        var transpose = data[0].map((col, i) => data.map(row => row[i]));
        jason = JSON.stringify(transpose);
        console.log(jason);
    })

    .catch(function(err){
        console.log("There was an error");
        console.log(err);
    })


/*
fs.readFile('newannouncer.json', (err, data) => {
    if (err) throw err;
    const nannouncer = JSON.parse(data);

    for (int i = 0; i < nannouncer.size(); i++) {
        if (nannouncer[i].) {
            
        }        
    }
    
*/

})



