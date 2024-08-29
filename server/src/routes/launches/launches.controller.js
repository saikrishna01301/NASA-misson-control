const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchWithId,
} = require("../../models/launches.models");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

//adding new launch and validating it
function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: "Missing required information" });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;
  // If launch doesn't exists
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({ error: "launch not found" });
  }
  //if launch exists then abort/delete the launch
  const aborted = abortLaunchWithId(launchId);
  console.log(aborted);
  return res.status(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
