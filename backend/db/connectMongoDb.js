import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected Successfully ");
    return true;
  } catch (err) {
    console.log("Error while connecting MongoDB ");
    return false;
  }
};
