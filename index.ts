import express, { Request, Response } from "express";
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use(cors());

const BlogPosts = [
  {
    slug: "first-blog-post",
    title: "First Blog Post",
    description: "Lorem ipsum dolor sit amet, consectetur adip.",
  },
  {
    slug: "second-blog-post",
    title: "Second Blog Post",
    description: "Hello React Router v6",
  },
];

app.get("/api/stat", (req, res) => {
  res.json(BlogPosts.length);
});

// 🟩 Thêm bài viết mới
app.post("/api/post", jsonParser, (req, res) => {
  const post = {
    slug: req.body.slug,
    title: req.body.title,
    description: req.body.description,
  };
  BlogPosts.push(post);
  res.status(200).send({ message: "Posted successful" });
});

// 🟩 Đăng nhập đơn giản
app.post("/api/login", jsonParser, (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password,
  };

  if (creds.username === "admin" && creds.password === "123") {
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(400).send({ message: "Login failed" });
  }
});

// 🟩 Lấy danh sách bài viết
app.get("/api/posts", function (req, res) {
  res.json(BlogPosts);
});

// 🟩 Lấy chi tiết bài viết theo slug
app.get("/api/post/:slug", function (req, res) {
  const slug = req.params.slug;
  const post = BlogPosts.find(
    (element: { slug: string }) => element.slug === slug
  );
  if (post) res.json(post);
  else res.status(404).send("Not found");
});

// 🟩 Khởi động server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
