const request = require('request')


const forecast = (lattitude, longitude, callback)=>{
    const url = "https://api.darksky.net/forecast/1777a937fb0cd87817bc8f6bb8c1a33b/"+longitude+","+lattitude+"?units=si&lang=es"
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback("Unable to process the request, Please try after sometime", undefined)
            console.log("Unable to process the request, Please try after sometime")
        }  else if(body.error){
            callback("Invalid Data", undefined);
            console.log("Invalid data")
        }else{
                callback(undefined, {
                    currently: body.currently
                });
        }
    })
}

module.exports = forecast