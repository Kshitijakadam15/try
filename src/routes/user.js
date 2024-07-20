const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const userController = require("../controllers/user");

router.post("/login", userController.login);
router.get("/getProfile", auth, userController.getProfile);

module.exports = router;
