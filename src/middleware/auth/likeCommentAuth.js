import jwt from "jsonwebtoken";
import User from "../../model/User";
const likeCommentAuth = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");
    if (!bearerToken) {
      res.status(401).json({ Message: "Please sign in" });
    } else {
      const token = bearerToken.split(" ")[1];
      const verified = jwt.verify(token, process.env.TOK_SECRET);
      const userEmail = verified.email;
      const userName = verified.name;
      const exists = await User.findOne({ email: userEmail });
      if (!exists) {
        res.status(401).json({ message: "Please sign in" });
      } else {
        res.locals.email = userEmail;
        res.locals.name = userName;
        next();
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

export default likeCommentAuth;
