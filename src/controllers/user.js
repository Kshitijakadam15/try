const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  try {
    const { email, password, roleType } = req.body;
    const user = await User.findOne({ email, isDeleted: false, roleType });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Generate token
    const accessToken = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.APP_SECRET,
      {
        expiresIn: "7h",
      }
    );

    return res.status(200).send({
      status: true,
      message: "Logged in successfully !",
      data: { accessToken, user: user },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: `${error.message}`,
    });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    return res.status(200).json({ status: true, user: req.user });
  } catch (err) {
    console.error(err);
    // serverLogger("error", { error: err.stack || err.toString() });
    // Implement logger function if any
    return res.status(500).json({
      status: false,
      error: `${err.message}`,
    });
  }
};
