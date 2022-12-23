import Admin from "../model/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class AdminServices {
  static async addAdmin(data) {
    const emailExist = await Admin.findOne({ email: data.email });
    if (emailExist) {
      return "Email exists";
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      const newAdmin = new Admin({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });
      await newAdmin.save();
      return { type: "response", data: newAdmin };
    }
  }

  static async login(data) {
    const admin = await Admin.findOne({ email: data.email });
    if (!admin) {
      return { type: "Email incorrect" };
    } else {
      const validPass = await bcrypt.compare(data.password, admin.password);
      if (!validPass) {
        return { type: "Password incorrect" };
      } else {
        const token = jwt.sign(
          { id: admin._id, email: admin.email, name: admin.name },
          process.env.TOK_SECRET
        );
        return { type: "response", data: token, name: admin.name };
      }
    }
  }

  static async getAdmins() {
    const admins = await Admin.find();
    return admins;
  }
}
