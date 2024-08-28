const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 5, 2040"),
  target: "kepler-442 b",
  customer: ["sai krishna", "rama krishna"],
  upcoming: true,
  success: true,
};


launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {             
      latestFlightNumber,
      upcoming: true,
      success: true,
      customer: ["sai krishna", "rama krishna"],
    })
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
