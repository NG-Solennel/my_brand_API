import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";
import routes from "./routes";
import session from "express-session";
import passport from "passport";
import passportGoogle from "./middleware/auth/passportGoogle";
import passportSetup from "./middleware/auth/passport";
const app = express();
app.use(session({ secret: "andela", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 5000;
try {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
  console.log("Database connected!!");

  app.use("/api/v1", routes);
  app.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
  });
  app.listen(port, () => {
    console.log("Server is working on port " + port);
  });
} catch (error) {
  console.log(error);
}
export default app;
