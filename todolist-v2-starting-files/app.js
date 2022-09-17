//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:Ebenezer6972@cluster0.5vxwnr1.mongodb.net/?retryWrites=true&w=majority");

const itemSchema = {
  name : {
    type:String,
    required : true
  }
};

const Item = mongoose.model("Item",itemSchema);

const listSchema = {
  name:String,
  items :[itemSchema]
}

const List = mongoose.model("List",listSchema);

const item1 = new Item({
  name : "Buy Food"
});
const item2 = new Item({
  name : "Cook Food"
});
const item3 = new Item({
  name : "Eat Food"
});

const defaultItems = [item1,item2,item3];

app.get("/", function(req, res) {

  Item.find({},function(err,items){
    if(items.length === 0){
      Item.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Successfully saved the items to database");
        }
      });
      res.redirect("/");
    }else{
      res.render("list", {listTitle: "Today", newListItems: items});
    }
  });

});

app.get("/:customListName",function(req,res){
  const customListName = req.params.customListName;
  console.log(req.params.customListName);
  List.findOne({name:customListName},function(err,foundList){
    if (err){
      console.log(err);
    }else{
      if(foundList){
        // Show an existing list
        res.render("list",{listTitle:customListName,newListItems:foundList.items});
      }else{
        // Create a new list
        const list = new List({
          name:customListName,
          items:defaultItems
        });
        list.save();
        res.redirect("/"+customListName)
      }
    }
  })
});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const listName  = req.body.list;

  const newItem = Item({
    name:item
  });

  if(listName == "Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName},function(err,foundList){
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/"+listName);
    })
  }

  newItem.save();
  res.redirect("/")
});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId,function(err){
    if(!err){
      console.log("Item successfully deleted");
    }
  });
  res.redirect("/");
})


app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
