// import User from "../../model/User";
// import jwt from "jsonwebtoken";

// const isLogged = async (req, res, next) => {
//   if (req.user) {
//     let userEmail = req.user.email;
//     const exists = await User.find({ email: userEmail });
//     console.log(exists);
//     if (exists.length >= 1) {
//       const token = jwt.sign({ _id: exists._id }, process.env.TOK_SECRET);
//       res.json({ person: req.user.displayName, token: token });
//       next();
//     } else {
//       console.log("Dont exist");
//       res.status(401).redirect("/api/users/signup");
//     }
//   }
// };

// export default isLogged;
