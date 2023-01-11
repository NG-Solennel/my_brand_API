import { AdminServices } from "../services/adminService";

export class AdminController {
  static async addAdmin(req, res) {
    try {
      const { email, name } = req.body;
      const credentials = {
        name,
        email,
      };
      const response = await AdminServices.addAdmin(credentials);
      if (response == "Email exists") {
        return res.status(409).json({ message: response });
      } else {
        return res.status(200).json({ credentials: response.data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }

  static async getAdmin(req, res) {
    try {
      const users = await AdminServices.getAdmins();
      return res.status(200).json({ Administrators: users });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
}
