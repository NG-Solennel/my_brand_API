import jwt from "jsonwebtoken";
const likeAuth = (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");
    if (!bearerToken) {
      res.status(401).json({ Message: "Please sign in" });
    } else {
      const token = bearerToken.split(" ")[1];
      const verified = jwt.verify(token, process.env.TOK_SECRET);
      const userEmail = verified.email;
      res.locals.email = userEmail;
      next();
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

export default likeAuth;
