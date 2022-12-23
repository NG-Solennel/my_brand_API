import jwt from "jsonwebtoken";
import Admin from "../../model/Admin";
const checkAdmin = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");
    if (!bearerToken) {
      res.status(401).json({ Message: "Not Authorized" });
    } else {
      const token = bearerToken.split(" ")[1];
      const verified = jwt.verify(token, process.env.TOK_SECRET);
      const userEmail = verified.email;
      const userName = verified.name;
      const exists = await Admin.findOne({ email: userEmail });
      if (!exists) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

export default checkAdmin;
