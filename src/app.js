const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();
const port = process.env.PORT || 3000;


const publicDirPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')
const viewsDirPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Davit Vardanyan'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, d) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: d,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Davit Vardanyan'
    })
})

app.get('*', (req, res) => {
    res.send('<h1>404: Not found.</h1>')
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})