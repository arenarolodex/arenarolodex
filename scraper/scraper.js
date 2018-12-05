const rp = require('request-promise');
const tough = require('tough-cookie');
var cheerio = require('cheerio');


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


// const

rp(options)
    .then(function($) {
        console.log($('table').text());
        // console.log("DELETE succeeded with status %d", response.statusCode);
        // console.log($('big > tr', html).length);
        // console.log($('table td')[0].text());
    })

    .catch(function(err){
        console.log("There was an error");
        console.log(err);
    })
