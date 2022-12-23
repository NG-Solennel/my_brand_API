import app from "../app";
import request from "supertest";
import Blog from "../model/Blog";
import User from "../model/User";
import { token } from "./resources";
const randomNumber = Math.floor(Math.random() * 100);

test("deleting blog should return 200 with token", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .delete("/api/v1/blogs/" + id)
    .set("Authorization", token)
    .send();
  expect(response.statusCode).toBe(200);
});

test("Viewing on blogs should give a 200", async () => {
  const response = await request(app).get("/api/v1/blogs").send();
  expect(response.statusCode).toBe(200);
});
test("Viewing on blogs should give json", async () => {
  const response = await request(app).get("/api/v1/blogs").send();
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});

test("Getting a single blog should return 200", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .get("/api/v1/blogs/" + id)
    .send();
  expect(response.statusCode).toBe(200);
});

test("Should return the json for that blog", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .get("/api/v1/blogs/" + id)
    .send();
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});

test("Should return Not found json as the route doesn't exists ", async () => {
  const response = await request(app).post("/api/v1/blogs/error").send({
    title: "The first blog title",
    content: "Blog content 1",
    image: "dataurl 1",
  });
  expect(response.headers["content-type"]).toEqual(
    expect.stringContaining("json")
  );
});

test("Posting a blog should provide unauthorized 401 as no token is provided", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app).post("/api/v1/blogs/").send({
    title: "The first blog title",
    content: "Blog content 1",
    image: "dataurl 1",
  });
  expect(response.statusCode).toBe(401);
});
test("This request should provide a 400 as no data is being passed so a validation error occurs", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .put("/api/v1/blogs/" + id)
    .send();
  expect(response.statusCode).toBe(400);
});
test("Commenting should provide 401 as it is lacking the auth token to extract data from", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .post("/api/v1/blogs/" + id + "/comments")
    .send({
      message: "Okay lets see how this will work",
    });
  expect(response.statusCode).toBe(401);
});

test("This should return a 200 as it getting comments and requires no data nor authentication", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .get("/api/v1/blogs/" + id + "/comments")
    .send();
  expect(response.statusCode).toBe(200);
});

test("Sending a like should return 401 as the request has authentication token to provide data for the like", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .post("/api/v1/blogs/" + id + "/like")
    .send();
  expect(response.statusCode).toBe(401);
});

test("deleting blog should return unauthorized 401 without token", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .delete("/api/v1/blogs/" + id)
    .send();
  expect(response.statusCode).toBe(401);
});

test("Posting a blog to provide 500 as testing won't reach cloudinary", async () => {
  const response = await request(app)
    .post("/api/v1/blogs/")
    .set("Authorization", token)
    .send({
      title: "The " + randomNumber + "blog title",
      content: "Blog content 1",
      image: imgUrl,
    });
  expect(response.statusCode).toBe(200);
});

test("Posting comment with token to provide 200", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .post("/api/v1/blogs/" + id + "/comments")
    .send({
      message: "Okay lets see how this will work",
    })
    .set("Authorization", token);
  expect(response.statusCode).toBe(200);
});
