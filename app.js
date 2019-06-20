var express=require("express");
var app=express();
var methodOverride=require("method-override");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/blog",{useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended:true}));//usually copy paste line these 3 lines
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

var blogSchema=new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type: Date, default: Date.now}

});

var Blog=mongoose.model("Blog",blogSchema);

app.get("/",function(req,res){
	res.redirect("/blog");
})


app.get("/blog",function(req,res){
	Blog.find({},function(err,blogs){
		if(err)
			console.log(err)
		else
			res.render("index",{blogs:blogs});

	});
	
});

app.post("/blog",function(req,res){
	Blog.create(req.body.blog,function(err,newBlog){
		if(err)
			console.log(err);
		else
			res.redirect("/blog")

	});

});

app.put("/blog/:id",function(req,res){
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,foundBlog){
		if(err)
			console.log(err);
		else
			res.redirect("/blog");

	});
	

});

app.delete("/blog/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err)
			console.log(err);
		else
			res.redirect("/blog");

	});
});

app.get("/blog/new",function(req,res){
	res.render("new");

});

app.get("/blog/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err)
			console.log(err);
		else
			res.render("show",{fBlog:foundBlog});

	});
	
});

app.get("/blog/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err)
			console.log(err)
		else
			res.render("edit",{blog:foundBlog});
	})

});



app.listen(3000,function(){
	console.log("Blog server have started");
}); 