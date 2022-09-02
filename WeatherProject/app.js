const { query } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,resp){
    // res.send("Server is up and running")
   resp.sendFile(__dirname + "/index.html")

});

app.post("/",function(req,resp){
    const city = req.body.cityName;
    console.log(city);
    const apiKey ="967f0744f903ffa0c91caeafbd6cc68f";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+",&appid="+apiKey+"&units="+unit;
    https.get(url,function(res){
    
        res.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
    
            const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(temp);
            console.log(desc);
            resp.write("<p>The weather is currently "+desc+"</p>");
            resp.write("<h1>The temperature in "+city+" is "+temp+" degrees C</h1>");
            resp.write("<img src="+imgURL+">");
            resp.send();
        });
    });
});


app.listen(3000,function(){
    console.log("Server is running on 3000");
});