var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog",{useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended:true}));//usually copy paste line these 3 lines
app.use(express.static("public"));
app.set("view engine","ejs");

var blogSchema=new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type: Date, default: Date.now}

});

var Blog=mongoose.model("Blog",blogSchema);

app.get("/blog",function(req,res){
	res.render("index");
})


app.listen(3000,function(){
	console.log("Blog server have started");
});