const express = require('express');
const hbs = require('hbs');

const app = express();
const fs = require('fs')

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

app.use((req, res, next) => {
    var date = new Date().toString()
    var log = `Path: ${req.url}  Time: ${date}` + '\n' 

    console.log(log)
    fs.appendFile('server.log', log, (err) => {
        if (err) {
            console.log('some error while logging data')
        }
    })
    next()
})

app.use((req, res, next) => {
    res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'This is our new home page',
        copyRightYear: new Date().getFullYear()
    })
});
app.get('/info.html', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about new page',
        copyRightYear: new Date().getFullYear()
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request',
        statusCode: 404
    })

})



app.listen(3000)