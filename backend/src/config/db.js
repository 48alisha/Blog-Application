import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");
  } catch (err) {
    console.log("Error in connecting to database: ", err.message);
    process.exit(1);
  }
};

export default databaseConnection;
