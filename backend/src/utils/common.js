import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const apiResponse = (res, status, type, message, data = null) => {
  if (type === "success") {
    return res.status(status).json({
      type: "success",
      message,
      data,
    });
  } else {
    return res.status(status).json({
      type: "error",
      message,
      data,
    });
  }
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
