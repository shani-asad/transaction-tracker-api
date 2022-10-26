const jwt = require('jsonwebtoken');
const { hashSync, compareSync } = require("bcrypt");
const db = require("../models")


module.exports = {
    async createUser(req, res, next) {
        try {
            const body = req.body
    
            let data = {
                username: body.username,
                password: hashSync(body.password, 10),
            }
            const user = await db.users.create(data)
            res.status(200).send(user)
        } catch (e) {
            next(e)
        }
    },

    async loginUser(req, res, next) {
        try {
            const body = req.body
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
        } catch (e) {
            next(e)
        }
    }
}