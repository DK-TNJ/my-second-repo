const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../src/utils/geoCode')
const forecast = require('../src/utils/forecast')

const app = express();

const dirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(dirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Home',
        name : 'Dileep Kannan',
        description : 'Home Page'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : "About",
        name : 'Dileep Kannan',
        description : 'About Me'
    })
})

app.get('/weather', (req, res)=>{
    const address = req.query.address
    if(address!=undefined && address!=""){

        geoCode(address, (error, {lattitude, longitude, location})=>{
            if(error){
                return res.send("Error in fetching Latitude information")
            }else{
                forecast(lattitude, longitude, (error, data)=>{
                    if(error){
                        return res.send("Error in fetching Weather information")
                    }else{
                        
                        res.send({
                            title : "Weather",
                            name : 'Dileep Kannan',
                            address : req.query,
                            temperature : data.currently.temperature
                        })
                    }
                    
                })
            }
        })

        
    }else{
        return res.send("Please provide Address")
    }
    
})

app.get('/weather/*', (req, res)=>{
    res.render('notfound', {
        title : "404 - Not found",
        name : "Dileep Kannan",
        description : "Article not Found"
    })
})


app.get('*', (req, res)=>{
    res.render("notfound", {
        title : "404 - Not found",
        name : "Dileep Kannan",
        description : "Page not Found"
    })
})

app.listen(3000, ()=>{
    console.log("Server is Up and Running in port "+3000)
})