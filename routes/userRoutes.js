const express = require("express");
const { postRegister, postLogin, getCurrentInfo } = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", postRegister);

router.post("/login", postLogin);

router.get("/current", validateToken, getCurrentInfo);

module.exports = router;