import jwt from "jsonwebtoken";
import { apiResponse } from "../utils/common.js";

const protect = async (req, res, next) => {
  try {
    const { blog_application } = req.cookies;

    if (!blog_application) {
      return apiResponse(res, 401, "error", "User not authorized!");
    }

    const decodedToken = jwt.verify(blog_application, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.log("Error in authorizing user: ", err.message);
    apiResponse(res, 500, "error", "Error in authorizing user!", err.message);
  }
};

export default protect;
