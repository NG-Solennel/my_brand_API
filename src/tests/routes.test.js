import app from "../app";
import request from "supertest";
import Message from "../model/Message";

beforeEach(async () => {
  console.log("Message before");
});

afterEach(async () => {
  console.log("Message after");
});

test("Should post a message", async () => {
  await request(app)
    .post("/api/v1/messages")
    .send({
      name: "Solennel",
      email: "ngsolennel@gmail.com",
      hiring: true,
      message: "Let see if your tests work",
    })
    .expect(200);
});
