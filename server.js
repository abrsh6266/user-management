import express from "express";
import { config } from "dotenv";
import dbConnection from "./dbConnection.js";
import authRoutes from "./routes/auth.js";
const app = express();
config();
dbConnection();

app.use(express.json());

app.use("/api", authRoutes);
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listing on port ${port}...`));
