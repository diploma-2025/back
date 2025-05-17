const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const {server} = require("./vars/config")
const {connectDB} = require("./db");
const AppDataSource = require("./ormconfig");
const router = require("./vars/routes");

const app = express()
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions))
app.use(express.json())
app.use(logger('combined'))
app.use("", router)
connectDB()
    .then(() => {
        app.listen(server.port, async () => {
            await AppDataSource.initialize()
            console.log(`Сервер запустився: http://${server.host}:${server.port}/`)
        })
    })
    .catch((e) => {
        console.error(e)
    })
