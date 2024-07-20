const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res
      .status(403)
      .json({ error: "Please Provide Authorization Header!" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid Token!" });

    //decoded will get complete obj used to create token in login api
    //so extract email from it
    const user = await User.findOne({ email: decoded.email, isDeleted: false });
    console.log(user);
    if (!user) return res.status(400).json({ error: "User not found!" });

    req.user = user;
    next();
  });
};
