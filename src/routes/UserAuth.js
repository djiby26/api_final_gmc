const express = require("express");
const router = express.Router();

const { signup, login, createUser } = require("../controllers/UserAuth");
const { checkTokenAndAdmin } = require("../middlewares/auth");

router.post("/register", signup);
router.post("/newUser", checkTokenAndAdmin, createUser);
router.post("/login", login);

module.exports = router;
