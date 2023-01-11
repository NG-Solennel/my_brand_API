import Admin from "../model/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class AdminServices {
  static async addAdmin(data) {
    const emailExist = await Admin.findOne({ email: data.email });
    if (emailExist) {
      return "Email exists";
    } else {
      const newAdmin = new Admin({
        name: data.name,
        email: data.email,
      });
      await newAdmin.save();
      return { type: "response", data: "Admin sign up was successfull!!" };
    }
  }

  static async getAdmins() {
    const admins = await Admin.find();
    return admins;
  }
}
