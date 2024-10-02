const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const { loadPlanetsData } = require("./models/planets.models");

const PORT = process.env.PORT || 8000;
const MONGO_URL =
  "mongodb+srv://saikrishna01301:saikrishna01301@nasacluster.eaqna.mongodb.net/?retryWrites=true&w=majority&appName=NasaCluster";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
}

startServer();
