const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https");
const { log } = require("console");
const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.listen(3000,function(req,res){
    console.log("Server running on port 3000");
});

app.post("/",function(req,resp){
    const firstName = req.body.fname;    
    const lastName = req.body.lname;    
    const email = req.body.email;    

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/";
    const options = {
        method: "POST",
        auth:"John Nixon:c4200229dff0751dc59a607e50540455-us11"
    }

   const request = https.request(url,options,function(res){
        if(res.statusCode == 200){
            // res.send("Sucessfully subscribed!!");
            resp.sendFile(__dirname + "/success.html");
        }else{
            // res.send("Something went wrong")
            resp.sendFile(__dirname + "/failure.html");
        }
        res.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();


    console.log(firstName,lastName,email);
})

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})


// API KEY 
// c4200229dff0751dc59a607e50540455-us11

// List ID 
// d7efc5701b