const express = require("express")
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended :true}))
app.get("/",function(req,res){
    // res.send("Hello World!");
    res.sendFile(__dirname + "/index.html")
    
});
app.get("/bmicalculator",function(req,res){
    // res.send("Hello World!");
    res.sendFile(__dirname + "/bmiCalculator.html")
    
});
app.post("/bmicalculator" , function(req,res){
    var height =parseFloat(req.body.height);
    var weight =parseFloat(req.body.weight);

    var result = weight / (height*height);
    console.log(req.body);
    res.send("You BMI is "+result);
});
app.post("/" , function(req,res){
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;
    console.log(req.body);
    res.send("The result of the calculation is "+result);
});

app.listen(3000,function(){
    console.log("Server is running on port The result of the calculation is 53000")
});