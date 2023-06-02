// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//Timestamp Microservice
app.get("/api/:date?", function (req, res) {
  let date;
  if (!req.params.date) {
    //No params, get current date
    date = new Date();
  } else {
    // Turn params into Unix interger
    let unixTimestamp = parseInt(req.params.date);
    // date validity
    if (!isNaN(unixTimestamp) && unixTimestamp > 0) {
      date = new Date(unixTimestamp);
    } else {
      //if invalid, parse it as string
      date = new Date(req.params.date);
    }
  }
  console.log(`date`, date);
  if (isNaN(date.getTime())) {
    res.json({ error: `${date} invalid input` });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
