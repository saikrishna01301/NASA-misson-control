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
  test("It should respond with 200 status", async () => {
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

    await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);
  });
  test("It should catch missing required properties", () => {});
  test("It should catch invalid status", () => {});
});
