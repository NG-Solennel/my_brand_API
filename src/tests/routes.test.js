import app from "../app";
import request from "supertest";
import Blog from "../model/Blog";
import User from "../model/User";
import { token } from "./resources";
const randomNumber = Math.floor(Math.random() * 100);
test("Should post a message", async () => {
  const response = await request(app).post("/api/v1/messages").send({
    name: "Solennel",
    email: "ngsolennel@gmail.com",
    hiring: true,
    message:
      "Let see if your tests works perfectly and fsfa afasf asfas asfas saff asf",
  });
  expect(response.statusCode).toBe(200);
});

test("Messages 400", async () => {
  const response = await request(app).post("/api/v1/messages").send({
    name: "Solennel",
    email: "ngsolennelgmail.com",
    hiring: true,
    message: "Let see if your tests works perfectly and",
  });
  expect(response.statusCode).toBe(400);
});
test("Should have a not found 404", async () => {
  const response = await request(app).post("/api/v1/message").send({
    name: "Solennel",
    email: "ngsolennelgmail.com",
    hiring: true,
    message: "Let see if your tests works perfectly and",
  });
  expect(response.statusCode).toBe(404);
});

test("Getting all users should return unauthorized as 401", async () => {
  const response = await request(app).get("/api/v1/users/").send();
  expect(response.statusCode).toBe(401);
});

test("The password provided is correct so should return 200", async () => {
  const user = await User.findOne();
  const response = await request(app).post("/api/v1/users/login").send({
    email: user.email,
    password: "andela",
  });
  expect(response.statusCode).toBe(200);
});
test("The email is written wrong so should return a validation error 400", async () => {
  const user = await User.findOne();
  const response = await request(app).post("/api/v1/users/login").send({
    email: "lasdkasda",
    password: user.password,
  });
  expect(response.statusCode).toBe(400);
});
test("return a validation error 400 as email is written wrong", async () => {
  const user = await User.findOne();
  const response = await request(app).post("/api/v1/users/signup").send({
    email: "leksfsaass",
    password: user.password,
  });
  expect(response.statusCode).toBe(400);
});
test("Not authorization as the token not provided return 401", async () => {
  const user = await User.findOne();
  const response = await request(app).post("/api/v1/users/signup").send({
    name: "Ngabo solennel",
    email: "ngsolennel@gmail.com",
    password: "andela",
  });
  expect(response.statusCode).toBe(401);
});

test("Getting all users should provide 200", async () => {
  const response = await request(app)
    .get("/api/v1/users/")
    .set("Authorization", token)
    .send();
  expect(response.statusCode).toBe(200);
});

test("Should give a 409 saying that user can't sign up because there is a conflict as he already exists", async () => {
  const response = await request(app)
    .post("/api/v1/users/signup")
    .set("Authorization", token)
    .send({
      name: "Ngabo solennel",
      email: "ngsolennel@gmail.com",
      password: "andela",
    });
  expect(response.statusCode).toBe(409);
});

test("Should return a 200 as all data is written right and the authorization token is provided", async () => {
  const response = await request(app)
    .post("/api/v1/users/signup")
    .set("Authorization", token)
    .send({
      name: "Ngabo Solennel",
      email: "ngsolennel" + randomNumber + "@gmail.com",
      password: "andela",
    });
  expect(response.statusCode).toBe(200);
});
