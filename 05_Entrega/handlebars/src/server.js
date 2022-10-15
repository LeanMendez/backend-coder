const express = require('express');
const appRouter = require('./routes/router')
const {engine} = require('express-handlebars')
const Router = require('./routes')

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.engine('hbs', engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './src/views')
app.use(express.static('public'))


app.use('/api/', appRouter);
app.use('/', Router);

app.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}`)
})

