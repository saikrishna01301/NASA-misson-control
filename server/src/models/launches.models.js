const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 5, 2040"),
  destination: "kepler-442 b",
  customer: ["sai krishna", "rama krishna"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
  launches,
};
