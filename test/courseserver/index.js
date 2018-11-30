const http = require('http');
const fs = require('fs');

//Get announcer
var announcer = undefined;
fs.readFile('newannouncer.json', (err, data) => {
  announcer = data;
});

const server = http.createServer(function (req,res) {
  //Send JSON
  res.setHeader('Content-Type', 'application/json');
  res.end(announcer);
});
server.listen(6969,()=>{
  console.log(`server listening at ${JSON.stringify(server.address())}`)
});
