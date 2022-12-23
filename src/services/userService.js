import User from "../model/User";
import { validateUser, validateLogin } from "../validations/user_validations";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class UserServices {
  static async addUser(data) {
    const emailExist = await User.findOne({ email: data.email });
    if (emailExist) {
      return "Email exists";
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      const newUser = new User({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });
      await newUser.save();
      return { type: "response", data: newUser };
    }
  }

  static async login(data) {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return { type: "Email incorrect" };
    } else {
      const validPass = await bcrypt.compare(data.password, user.password);
      if (!validPass) {
        return { type: "Password incorrect" };
      } else {
        const token = jwt.sign(
          { id: user._id, email: user.email,name: user.name },
          process.env.TOK_SECRET
        );
        return { type: "response", data: token, name: user.name };
      }
    }
  }

  static async getUsers() {
    const users = await User.find();
    return users;
  }
}
