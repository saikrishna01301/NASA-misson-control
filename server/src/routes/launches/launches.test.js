const request = require("supertest");
const app = require("../../app.js");

describe("Test Get /launches", () => {
  test("It should respond with 200 status", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
    //superset has it's own assertion
    // expect(response.statusCode).toBe(200); It is jest assertion
  });
});

describe("Test Post /launches", () => {
  const completeLaunchData = {
    mission: "kepler Exploration X",
    rocket: "Explorer IS1",
    target: "kepler-442 b",
    launchDate: "january 05, 2080",
  };
  const launchDataWithoutDate = {
    mission: "kepler Exploration X",
    rocket: "Explorer IS1",
    target: "kepler-442 b",
  };

  const invalidLaunchDate = {
    mission: "kepler Exploration X",
    rocket: "Explorer IS1",
    target: "kepler-442 b",
    launchDate: "hello",
  };

  test("It should respond with 201 status", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    //testing the req date and res date
    const reqDate = new Date(completeLaunchData.launchDate).valueOf();
    const resDate = new Date(response.body.launchDate).valueOf();
    expect(reqDate).toBe(resDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);
    console.log(response.body);
    expect(response.body).toStrictEqual({
      error: "Missing required information",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(invalidLaunchDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Invalid Date",
    });
  });
});
