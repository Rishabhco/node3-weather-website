const request =require("request")
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2949cf9e08c65c7fad91020801cf48d0&query='+latitude+','+longitude+'&units=m'


    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("unable to Connect", undefined)
        }
        else if (response.body.error) {
            callback("unable to find location", undefined)
        }
        else {
            callback(undefined,"It is currently "+ response.body.current.temperature +" degrees out. There is "+ response.body.current.precip +"% chance of rain.")
        }
    })
}
module.exports= forecast