import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("Error while connecting to database:", error);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected!");
  });
};

export default dbConnection;
