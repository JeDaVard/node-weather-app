const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const publicDirPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', '../templates/views')
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
    res.send('<h1>About</h1>')
})

app.get('*', (req, res) => {
    res.send('<h1>404: Not found.</h1>')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})