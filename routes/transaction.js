const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const restrictUser = require('../middlewares/restrictUser')

const { listTransactions, createTransaction } = require('../controllers/transaction')


router.use(bodyParser.json())

//TODO: only show transactions for the currently logged in user
router.get("/", restrictUser, listTransactions)

router.post("/", restrictUser, createTransaction)

module.exports = router;