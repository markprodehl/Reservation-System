const path = require("path");
const express = require("express");
const { reservations, waitingList } = require("./data");

const app = express();

const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
// This middleware is responsible for constructing the
// body property on the response object passed to our route handlers.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/makereservation", (req, res) => {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/reservations", (req, res) => {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Routes data
app.get("/api/tables", (req, res) => {
  return res.json(reservations);
});
app.get("/api/waitinglist", (req, res) => {
  return res.json(waitingList);
});

// Post data
app.post("/api/tables", (req, res) => {
  const newRes = req.body;
  if (reservations.length < 5) {
    reservations.push(newRes);
    res.send(true);
  } else {
    waitingList.push(newRes);
    res.send(false);
  }
});

app.post("/api/clear", (req, res) => {
  reservations.length = 0;
});

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
