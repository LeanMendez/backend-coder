const express = require('express');
const appRouter = require('./routes/router.js')

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/productos/', appRouter);

app.listen(PORT, ()=>{
    console.log('Server running on localhost:8080')
})