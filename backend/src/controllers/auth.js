import User from "../models/user.js";
import {
  apiResponse,
  hashPassword,
  generateToken,
  comparePassword,
} from "../utils/common.js";

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

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return apiResponse(res, 400, "error", "All field are required!");
  }

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return apiResponse(res, 401, "error", "Invalid email or password!");
    }

    const isPasswordMatch = await comparePassword(
      password,
      userExists.password
    );
    if (!isPasswordMatch) {
      return apiResponse(res, 401, "error", "Invalid email or password!");
    }

    const token = generateToken({
      _id: userExists._id,
    });

    res.cookie("blog_application", token);
    apiResponse(res, 200, "success", "Login successfully!", {
      id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      profileImage: userExists.profileImage,
    });
  } catch (err) {
    console.log("Error in login: ", err.message);
    return apiResponse(res, 500, "error", "Error in login!", err.message);
  }
};
