const http = require('http');
const fs = require('fs');

//Get announcer
var announcer = undefined;
fs.readFile('2020_2021announcer.json', (err, data) => {
  announcer = data;
});

const server = http.createServer(function (req,res) {
  //Send JSON
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(announcer);
});
server.listen(6969,()=>{
  console.log(`server listening at ${JSON.stringify(server.address())}`)
});
