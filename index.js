const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/soldb", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", routes);

    app.listen(3000, () => {
      console.log("Server has started");
    });
  });
