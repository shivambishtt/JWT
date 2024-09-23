import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant.js";

export const connectDB = async function () {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Mongo DB connected ... DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO DB Connection error", error);
    process.exit(1);
  }
};
