import crypto from "crypto";

const refreshToken = (req, res, next) => {
  setInterval(assignToken, 300000);
  next();
};

const assignToken = () => {
  process.env.TOK_SECRET = crypto.randomBytes(64).toString("hex");
};
