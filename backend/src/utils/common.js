import bcrypt from "bcryptjs";

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
