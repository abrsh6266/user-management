import express from "express";
import { config } from "dotenv";
import dbConnection from "./dbConnection.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import isLoggedIn from "./middleware/isLoggedIn.js";
const app = express();
config();
dbConnection();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/post",isLoggedIn,postRoutes);
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listing on port ${port}...`));
