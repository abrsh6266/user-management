import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  const accessToken = await req.header("Authorization").replace("Bearer ", "");
  if (!accessToken) {
    return res
      .status(401)
      .json({ error: true, message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ error: true, message: "Invalid access token" });
  }
};

export default isLoggedIn;
