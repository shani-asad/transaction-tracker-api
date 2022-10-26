
require('dotenv').config();
const express = require('express')
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV;
const config = require(__dirname + '/config/config.json')[env];

const transactionRoute = require('./routes/transaction');
const userRoute = require('./routes/user');


const sequelize = new Sequelize(config);

const app = express()

app.use('/transactions', transactionRoute);
app.use('/users', userRoute);


app.get("/", (req, res) => {
    res.send("Welcome to Transaction API")
})

app.use((req, res) => {
    res.status(404).send("<h1> Endpoint not found.</h1>")
})

app.listen(3000, () => {
    console.log('server listening on http://localhost:3000.')
})