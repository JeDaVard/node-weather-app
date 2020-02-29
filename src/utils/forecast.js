const request = require('request');

function forecast(latitude, longitude, callback) {
    const url = `https://api.darksky.net/forecast/835844e72599eb3f8f0e6a1ee5412c8f/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, data) => {
        if (error) {
            callback('Unable to connect to service.', undefined)
        } else if (data.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${data.body.currently.temperature+'ºC'}, ${data.body.minutely.summary}`)
        }
    })
}

module.exports = forecast