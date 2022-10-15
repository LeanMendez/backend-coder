const express = require('express');
const appRouter = require('./routes/router')
const Router = require('./routes')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.static('public'))


app.use('/api/', appRouter);
app.use('/', Router);

app.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}`)
})

