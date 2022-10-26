const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { createUser, loginUser } = require('../controllers/user')


router.use(bodyParser.json())

router.post("/", createUser)

router.post("/login", loginUser)

module.exports = router;