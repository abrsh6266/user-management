import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, email: user.email };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "1d" }
    );
    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await UserToken.deleteOne({ userId: user._id });
    await new UserToken({ userId: user._id, token: accessToken }).save();
    return Promise.resolve({ accessToken });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default generateTokens;