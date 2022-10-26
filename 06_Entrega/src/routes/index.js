const express = require('express')
const appRouter = express.Router()

//rutas
appRouter.get('/', (req, res)=>{
    res.render('home', {productos:[{title: 'hola', price: 45, thumbnail: 'hola', id: 1}]})
})

// appRouter.post('/', (req, res)=>{
//     const data = req.body
//     res.status(201)
// })

module.exports = appRouter;