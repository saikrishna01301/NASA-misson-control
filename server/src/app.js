const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();

//I'm using client production build in server so no need of CORS

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//logger middleware
app.use(morgan("combined"));
// Middleware to parse JSON bodies (must be above routes!)
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

// telling the server to open index.htm as landing page
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
