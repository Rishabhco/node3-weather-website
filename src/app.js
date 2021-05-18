const path = require('path')
const express = require('express')
const hbs = require('hbs')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,"../public"))

const app = express()

//Define path for express onfig
const publicDirectoryPath = path.join(__dirname, "../public")
const viewspath = path.join(__dirname, "../templates/views")
const partialpath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))     //by using this we can use static files i.e. html files
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Rishabh Agrawal"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Weather App",
        name: "Rishabh Agrawal"
    })
})
app.get('/help', (req, res) => {
    res.render('Help', {
        title: "Help on Weather App",
        name: "Rishabh Agrawal"
    })
})

// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help',(req,res)=>{
// res.send([{
//         name:"Rishabh",
//         age:19
//     },
//     {
//         name:"Sarah",
//         age:18
//     }])
// })
// app.get('/about',(req,res)=>{
//     res.send("<h1>About Page!")
// })
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please add a address to find weather."
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                data: data,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     location:req.query.address,
    // })
})

//Goal- Setup two new routes i.e. about and weather and give a page title

//Goal- Update two routes  (about with html and weather with json give forecast and location strings)

//app.com
//app.com/help
//app.com/about
//app.com/weather

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please give a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errormsg: "Help article not found",
        name: "Rishabh Agrawal"
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errormsg: "No fuch file found",
        name: "Rishabh Agrawal"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000!")
})