const express = require('express')
const router = require('./router/router')

const server = express()

server.use(router)

server.listen(7777,() => {
    console.log('le server est lancer sur le port 7777')
})