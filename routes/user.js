const express = require("express");
const { hashSync, compareSync } = require("bcrypt");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const restrictUser = require('../middleware/restrictUser')


const db = require("../models")

router.use(bodyParser.json())

router.post("/", async (req, res, next) => {
    const body = req.body

    let data = {
        username: body.username,
        password: hashSync(body.password, 10),
    }

    try {
        const user = await db.users.create(data)
        res.status(200).send(user)
    } catch (e) {
        next(e)
    }
})

router.post("/login", async (req, res, next) => {
    const body = req.body
    try {
        const user = await db.users.findOne({ where: { username: body.username } })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: `Cannot find username ${body.username}`
            })
        }

        if (!compareSync(body.password, user.password)) {
            return res.status(401).json({
                success: false,
                message: `Incorrect password`
            })
        }

        const payload = {
            username: user.username,
            id: user.id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })

        return res.json({
            success: true,
            user: payload,
            token: `Bearer ${token}`
        })
    } catch(e) {
        next(e)
    }
})

module.exports = router;