const express = require("express");
const { Op } = require('sequelize')
const router = express.Router();
const bodyParser = require("body-parser");
// const passport = require('passport');
const restrictUser = require('../middlewares/restrictUser')

const db = require("../models")

router.use(bodyParser.json())

//TODO: only show transactions for the currently logged in user
router.get("/", restrictUser, async (req, res, next) => {
    try {

        const order = []
        if(req.query.sortDate){
            order.push(['date', req.query.sortDate])
        }
        if(req.query.sortAmount){
            order.push(['amount', req.query.sortAmount])
        }

        const conditions = {
            userId: res.locals.userId,
        }

        if(req.query.type){
            conditions.type = req.query.type
        }

        if(req.query.from){
            conditions.amount = {}
            conditions.amount[Op.gte] = req.query.from
        }

        if(req.query.to){
            if(!conditions.amount) conditions.amount = {}
            conditions.amount[Op.lte] = req.query.to
        }

        let limit = 3
        if(req.query.perPage){
            limit = parseInt(req.query.perPage)
        }

        let offset = 0
        if(req.query.page){
            offset = limit * (req.query.page - 1)
        }

        const transactions = await db.transactions.findAll({
            where: conditions,
            order: order,
            limit: limit,
            offset: offset
        })

        res.send(transactions)
    } catch (e) {
        next(e)
    }
});

router.post("/", restrictUser, async (req, res, next) => {
    const body = req.body

    let data = {
        userId: res.locals.userId,
        amount: body.amount,
        notes: body.notes,
        date: body.date,
        type: body.type
    }

    try {
        const transaction = await db.transactions.create(data)
        res.send(transaction)
    } catch (e) {
        next(e)
    }

})

module.exports = router;