const express = require("express");
const rateLimit = require("./lib/setRateLimit")
const app = express();
const port = 3000;

const limiter = rateLimit({
    windowMs: 60 * 60 * 60 * 1000,
    max: 1000
})

app.use(limiter)

app.get('/', (req, res) => {
    res.send(200)
})

app.listen(port, (req, res) => {
    console.log('listen on port')
})