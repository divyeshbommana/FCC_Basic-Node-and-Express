let express = require("express");
let bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger);
app.get("/", function (req, res) {
  console.log("Inside the fun");
  let absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
  let abb = __dirname + "/public";
  app.use("/public", express.static(abb));
  abb = __dirname + "/json";
});

app.get("/json", function (req, res) {
  messageStyle = process.env.MESSAGE_STYLE;
  if (messageStyle === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

function getTime(req, res, next) {
  req.time = new Date().toString();
  next();
}

function finHandler(req, res) {
  res.json({ time: req.time });
}

app.get("/now", getTime, finHandler);

function logger(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
}

function echo(req, res) {
  word = req.params.word;
  res.json({ echo: word });
}

app.get("/:word/echo", echo);

app.get("/name", function (req, res, next) {
  res.json({ name: req.query.first + " " + req.query.last });
});

app.post("/name", function(req, res){
  res.json({ name: req.body.first + " " + req.body.last });
})

module.exports = app;
