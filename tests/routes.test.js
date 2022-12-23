import app from "../src/app";
import request from "supertest";
import Blog from "../src/model/Blog";
import User from "../src/model/User";
import Message from "../src/model/Message";
import { imgUrl, token } from "./resources";
const randomNumber = Math.floor(Math.random() * 1000000);
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

test("Viewing comments", async () => {
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
    .set("Authorization", token)
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

test("Posting a blog to provide 500 as testing won't reach cloudinary", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .post("/api/v1/blogs/")
    .send({
      title: "The first blog title",
      content: "Blog content 1",
      image: "dataurl 1",
    })
    .set("Authorization", token);
  expect(response.statusCode).toBe(500);
});

test("Posting a blog to provide 500 as testing won't reach cloudinary", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .post("/api/v1/blogs/")
    .send()
    .set("Authorization", token);
  expect(response.statusCode).toBe(400);
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

test("Getting all users should provide 200", async () => {
  const response = await request(app)
    .get("/api/v1/users/")
    .set("Authorization", token)
    .send();
  expect(response.statusCode).toBe(200);
});

test("Should give a 409 saying that user can't sign up because there is a conflict as he already exists", async () => {
  const user = await User.findOne();
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

test("Posting comment with token to provide 200", async () => {
  const blog = await Blog.findOne({ content: "Blog content 5" });
  const id = blog._id;
  const response = await request(app)
    .post("/api/v1/blogs/" + id + "/comments")
    .set("Authorization", token)
    .send({
      message: "Okay lets see how this will work",
    });
  expect(response.statusCode).toBe(200);
});

test("Posting like with token to provide 200", async () => {
  const blog = await Blog.findOne({ content: "Blog content 5" });
  const id = blog._id;
  const response = await request(app)
    .post("/api/v1/blogs/" + id + "/like")
    .send()
    .set("Authorization", token);
  expect(response.statusCode).toBe(200);
});

test("Viewing a single comment with token to provide 200", async () => {
  const blog = await Blog.findOne({ content: "Blog content 5" });
  const id = blog._id;
  const commentId = blog.comments[0]._id;
  const response = await request(app)
    .get("/api/v1/blogs/" + id + "/comments/" + commentId)
    .send()
    .set("Authorization", token);
  expect(response.statusCode).toBe(200);
});

test("Deleting a comment", async () => {
  const blog = await Blog.findOne({ content: "Blog content 5" });
  const id = blog._id;
  const commentId = blog.comments[0]._id;

  const response = await request(app)
    .delete("/api/v1/blogs/" + id + "/comments/" + commentId)
    .send()
    .set("Authorization", token);
  expect(response.statusCode).toBe(200);
});

test("Getting a single blog should return 200", async () => {
  const blog = await Blog.findOne();
  const id = blog._id;
  const response = await request(app)
    .get("/api/v1/blogs/" + id)
    .send();
  expect(response.statusCode).toBe(200);
});

test("Deleting a message should return a 200 as token is provided", async () => {
  const message = await Message.findOne();
  const id = message._id;
  const response = await request(app)
    .delete("/api/v1/messages/" + id)
    .set("Authorization", token)
    .send();
  expect(response.statusCode).toBe(200);
});

test("Getting a message should return a 200 as token is provided", async () => {
  const message = await Message.findOne();
  let id = message._id;
  const response = await request(app)
    .get("/api/v1/messages/" + id)
    .set("Authorization", token)
    .send();
  expect(response.statusCode).toBe(200);
});

test("Should return a 200 as all data is written right and the authorization token is provided", async () => {
  const response = await request(app)
    .post("/api/v1/admin/signup")
    .set("Authorization", token)
    .send({
      name: "Ngabo Solennel",
      email: "ngsolennel@gmail.com",
      password: "andela",
    });
  expect(response.statusCode).toBe(409);
});

test("Updating a blog to provide 200 unless testing won't reach cloudinary", async () => {
  const blog = await Blog.findOne({ content: "Blog content 5" });
  const id = blog._id;
  const response = await request(app)
    .put("/api/v1/blogs/" + id)
    .set("Authorization", token)
    .send({
      title: "The " + randomNumber + "blog title",
      content: "Blog content 5",
      image: imgUrl,
    });
  expect(response.statusCode).toBe(200);
});

test("Posting a blog to provide 200 ", async () => {
  const response = await request(app)
    .post("/api/v1/blogs")
    .set("Authorization", token)
    .send({
      title: "The " + randomNumber + " blog title",
      content: "Blog content " + randomNumber,
      image: imgUrl,
    });
  expect(response.statusCode).toBe(200);
});

test("Viewing all messages should provide 200", async () => {
  const response = await request(app)
    .get("/api/v1/messages")
    .set("Authorization", token)
    .send();
  expect(response.statusCode).toBe(200);
});

test("Viewing all administrators should provide 200", async () => {
  const response = await request(app)
    .get("/api/v1/admin")
    .set("Authorization", token)
    .send();
  expect(response.statusCode).toBe(200);
});
