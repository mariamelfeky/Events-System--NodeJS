
//import modules
let express = require("express");
let path = require("path");
let mongoose = require("mongoose");
let authenticationRouter = require("./Routers/authenticationRouter");
let session = require("express-session");
let speakersRouter = require("./Routers/speakersRouter");
let eventRouter = require("./Routers/eventRouter");
let adminRouter = require("./Routers/adminRouter");

//open srever
const server = express();
server.listen(8082,()=>{
    console.log("Server is listening on 8082");
});

//DataBase connection
mongoose.connect("mongodb://localhost:27017/eventDB")
.then(()=>{
    console.log("DataBase connected");
})
.catch((error)=>{
    console.log(error+"");
});



//setting
server.use(express.urlencoded({extended:true}));
server.set("view engine","ejs");
server.set("views",path.join(__dirname,"view"));
server.use(express.static(path.join(__dirname,"public")));
server.use(session({secret:"mariam"}));

// first middleware (print method,url)
server.use(function(request,response,next){
    console.log("middleware first "+request.method+" : " +request.url)
    next();
});

server.use(authenticationRouter);
server.use(function(request,response,next){
    if(request.session.role){
        next();  
    }
    else{
        response.redirect("/login");
    }       

})
server.use("/admin",adminRouter);
server.use("/speakers",speakersRouter);
server.use("/events",eventRouter);

//routers

server.get("/home",function(request,response){
    response.render("authentication/home");
   //response.send("Home page");
});//home

server.use((request,response)=>{
    response.send("default welcome");
})//default middleware









