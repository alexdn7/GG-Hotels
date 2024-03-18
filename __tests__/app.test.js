const { app } = require("../app.js");
const request = require("supertest");
const { StatusCodes } = require("http-status-codes");

describe("/hotels", () => {
  test("getAllHotels, should return all hotels", async () => {
    const response = await request(app).get("/hotels/");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GetById, should return BAD REQUEST, invalid ID given", async () => {
    const response = await request(app).get("/hotels/-1");
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test("createHotel without Token, should return Unauthorized", async () => {
    const requestBody = {
      name: "test",
      description: "test",
      stars: 3,
      rating: 2.5,
      location: "test",
      available_rooms: 2,
      allowPets: true,
      parking: true,
    };
    const response = await request(app).post("/hotels/add").send(requestBody);
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });
});

describe("/rooms", () => {
  test("GetAll, should return all rooms", async () => {
    const response = await request(app).get("/rooms/");
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("deleteRoom without Token, should return Unauthorized", async () => {
    const response = await request(app).delete("/rooms/delete/1");
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  })
});


describe("/auth", () => {
  test("Register without request body, should return BAD REQUEST", async () => {
    const response = await request(app).post("/auth/register");
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  })
})
