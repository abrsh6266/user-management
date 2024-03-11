import { Router } from "express";
import User from "../models/user";
import bcryptjs from "bcryptjs";
import {signUpBodyValidation} from "../utils/validationSchema"
const router = Router();

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

export default router;
