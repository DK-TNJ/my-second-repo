const request = require('request')

const geoCode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiZGlsZWVwa3RuaiIsImEiOiJjazY5ZHJkbDkwY2RuM29uOTAzbWdsdzY5In0.mSSRt7j1ZflzBMy1S6q1mA&limit=1"
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback("Unable to reach the server", undefined)
        }else if (body.error){
            callback("Unable to find location", undefined) 
        }else{
            callback('', {
                lattitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
