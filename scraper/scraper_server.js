const http = require("http");
const fs = require("fs");
const path = require("path");
const rp = require("request-promise");
const tough = require("tough-cookie");
var cheerio = require("cheerio"),
    cheerioTableparser = require("cheerio-tableparser");


let cookie = new tough.Cookie({
    key: ".ASPXAUTH",
    value: process.env.ARENACOOKIE,
    domain: "www.lowell-courseselection.org",
    httpOnly: true,
});

var cookiejar = rp.jar();
cookiejar._jar.rejectPublicSuffixes = false;
cookiejar.setCookie(cookie.toString(), "http://www.lowell-courseselection.org");

var options = {
    method: "GET",
    uri: "http://www.lowell-courseselection.org/",
    jar: cookiejar,
    // resolveWithFullResponse: true
    transform: function (body) {
        return cheerio.load(body, {
            decodeEntities: false
        });
    }
};

let announcer = JSON.parse(fs.readFileSync(path.join(__dirname, "newannouncer.json")));
const switchables = ['Library Training 2A', 'Technical Theater 1A', 'Student Aide A (fall semester)', 'English 2B: Points of View', 'Student Aide B (spring semester)', 'American Democracy', 'Library Training 1B', 'Economics', 'College/Career', 'Library Training 1A', 'Technical Theater 1B', 'AP Human Geography', 'Health', 'English 2A The Adolescent in Literature', 'Library Training 2B'];

function updateAnnouncer() {
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
                let name = newData[index][0];
                if (name === "") continue;

                const teacher = newData[index][1];
                let block = newData[index][2];
                const seats = newData[index][4];

                let semester;

                if (block > 10) {
                    semester = Math.floor(block / 10).toString();
                    block = (block % 10).toString();
                } else {
                    semester = "Both";
                    block = block.toString();
                }

                if (switchables.includes(name)) {
                    name = name.replace(/\(.+\)$/, '');
                    name += ' (' + (semester === '1' ? 'fall' : 'spring') + ' semester)';
                }

                for (let dept of indexDept) {
                    if (index <= dept.lastIndex) {
                        //Make objects that don"t exist yet
                        if (!newannouncer[dept.dept][name])
                            newannouncer[dept.dept][name] = {};
                        if (!newannouncer[dept.dept][name][teacher])
                            newannouncer[dept.dept][name][teacher] = [];

                        newannouncer[dept.dept][name][teacher]
                            .push([block, semester, seats]);
                        break;
                    }
                }
            }
            // console.log(newData[4]);

            announcer = newannouncer;
            console.log("Updated Announcer!");
        })
        .catch(function(err){
            console.log("There was an error");
            console.log(err);
        });
}

updateAnnouncer();
setInterval(updateAnnouncer, 5 * 1000);

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"*"});
    res.write(JSON.stringify(announcer));
    res.end();
});

server.listen(process.env.PORT || 7000, () => {
    console.log(server.address());
});
