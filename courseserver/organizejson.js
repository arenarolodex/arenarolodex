const fs = require("fs");

fs.readFile("announcer.json", (err, data) => {
  if (err) throw err;
  //Get data from original announcer
  const ogannouncer = JSON.parse(data);

  //This object will be the object we write JSON data from
  var newannouncer = {
    "Math": {},
    "Science": {},
    "English": {},
    "Social Studies": {},
    "VPA": {},
    "World Languages": {},
    "Physical Education": {},
    "Other": {},
    "Learning Services": {}
  };

  //Read each course, write them to newannouncer
  ogannouncer.forEach(course => {
    //Get course information (just convenience for getting keys)
    // const deptKey = [
    //   "Math",
    //   "Science",
    //   "English",
    //   "Social Studies",
    //   "VPA",
    //   "World Language",
    //   "PE",
    //   "Other"
    // ];
    // const deptIndex = deptKey[parseInt(course["Department Number"]) - 1];
    const deptIndex = course["Department Name"]
    const name = course["Course Name"];
    const teacher = course["Teacher"];
    // console.log(course);

    //Make objects that don't exist yet
    if (!newannouncer[deptIndex][name]) newannouncer[deptIndex][name] = {};
    if (!newannouncer[deptIndex][name][teacher])
      newannouncer[deptIndex][name][teacher] = [];

    newannouncer[deptIndex][name][teacher].push([
      course["Block"],
      course["Room"],
      "34"
    ]);
  });

  //Write newannouncer.json
  const announcerData = new Uint8Array(
    Buffer.from(JSON.stringify(newannouncer))
  );
  fs.writeFile("newannouncer.json", announcerData, err => {
    if (err) throw err;
    console.log("newannouncer.json has been written.");
  });
});
