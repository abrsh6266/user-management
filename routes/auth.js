import { Router } from "express";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import {
  signUpBodyValidation,
  logInBodyValidation,
} from "../utils/validationSchema.js";
import generateTokens from "../utils/generateToken.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { error } = logInBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    console.log(user.email);
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid email or password" });
    }
    const verifiedPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!verifiedPassword) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }
    const { accessToken, refreshToken } = await generateTokens(user);
    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      message: "logged in successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
router.post("/signup", async (req, res) => {
  try {
    const { error } = signUpBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "user with given email already exist!" });
    }
    const salt = await bcryptjs.genSalt(Number(process.env.SALT));
    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res
      .status(201)
      .json({ error: false, message: "Account created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
router.get("/user/get", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    res.status(200).json({ error: false, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

export default router;
