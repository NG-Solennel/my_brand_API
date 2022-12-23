import { AdminServices } from "../services/adminService";

export class AdminController {
  static async addAdmin(req, res) {
    try {
      const { email, password, name } = req.body;
      const credentials = {
        name,
        email,
        password,
      };
      const response = await AdminServices.addAdmin(credentials);
      if (response.type == "error") {
        return res.status(400).json({ error: response.data });
      } else if (response == "Email exists") {
        return res.status(409).json({ message: response });
      } else {
        return res.status(200).json({ credentials: response.data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = {
        email,
        password,
      };
      const response = await AdminServices.login(data);
      if (response.type == "Email incorrect") {
        return res.status(400).json({ message: "Email or password incorrect" });
      } else if (response.type == "Password incorrect") {
        return res.status(400).json({ message: "Email or password incorrect" });
      } else if (response.type == "error") {
        return res.status(400).json({ error: response.data });
      } else if (response.type == "response") {
        res.header("auth-token", response.data);
        return res
          .status(200)
          .json({ name: response.name, token: response.data });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }

  static async getAdmin(req, res) {
    try {
      const users = await AdminServices.getAdmins();
      return res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
}
