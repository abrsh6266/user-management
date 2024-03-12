import { Router } from "express";
import User from "../models/user.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

const router = Router();
