import User from "../models/user.js";
import { apiResponse, hashPassword } from "../utils/common.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return apiResponse(res, 400, "error", "All field are required!");
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return apiResponse(res, 400, "error", "User already exists!");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    apiResponse(res, 201, "success", "Register successfully!");
  } catch (err) {
    console.log("Error in register: ", err.message);
    apiResponse(res, 500, "error", "Error in register!", err.message);
  }
};
