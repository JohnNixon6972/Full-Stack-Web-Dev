//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption")

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect("mongodb+srv://Ebenezer6972:Ebenezer6972@cluster0.ugx4dof.mongodb.net/userDB?retryWrites=true&w=majority")

const userSchema = new mongoose.Schema({
    email:String,
    password:String
});



userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]},);

const User = new mongoose.model("User",userSchema)

app.get("/",function(req,res){
    res.render("home");
})
app.get("/login",function(req,res){
    res.render("login");
})
app.post("/login",function(req,res){
    const userName = req.body.username;
    const password = req.body.password;

    User.findOne({email:userName},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if (foundUser.password === password){
                    res.render("secrets")
                }else{
                    console.log("Wrong password");
                }
            }
        }
    })
})


app.get("/register",function(req,res){
    res.render("register");
})
app.post("/register",function(req,res){
    const newUser = new User({
        email:req.body.username,
        password:req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render("secrets")
        }
    });
});

app.listen(3000,function(){
    console.log("Server statred on port 3000.");
})