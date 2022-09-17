const express = require("express")

const app = express();

app.get("/", function(req,res){
    res.send("<h1>Hello World!</h1>")
})

app.get("/contact",function(req,res){
    res.send("Contat me at JBN.com")
})

app.get("/about",function(req,res){
    res.send("I am a professional Student Developer")
})
app.get("/hobbies",function(req,res){
    res.send("<ul><li>Coding</li><li>Games</li></ul>")
})

app.listen(3000,function(){
    console.log("Server started on port 3000")
});