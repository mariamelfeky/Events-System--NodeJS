const express = require("express");
let path = require("path");
const authenticationRouter = express.Router();
require("../Model/speakerModel");
mongoose = require("mongoose");
speakerModel = mongoose.model("speakers");

authenticationRouter.get("/login",(request,response)=>{
     response.render("authentication/index");

});
authenticationRouter.post("/login",(request,response)=>{
    console.log("test");
    if(request.body.UserName=="mariam"&& request.body.Password=="1234"){
        request.session.role = "admin";
        //response.locals.Name = "mariam";
        response.redirect("/admin/profile");

    }
    else{
        speakerModel.findOne({UserName:request.body.UserName,Password:request.body.Password})
        .then((data)=>{
            console.log(data);
            console.log(data._id);
            if(data!=null){
                request.session.role = "user";
                request.session._id = data._id;
                console.log(data._id);
                response.locals.Name = data.UserName;
                response.redirect("/speakers/profile");
            }
           else{
                response.redirect("/login");
            }
        })
        .catch((error)=>{
            console.log(error+"");
        })
    }
});


authenticationRouter.get("/register",(request,response)=>{
    response.render("authentication/register");

});

authenticationRouter.post("/add",(request,response)=>{
    console.log("test...");
    console.log(request.body);
    // response.send(request.body);

    let newSpeasker = new speakerModel(
        request.body
        
    ).save()
    .then((data)=>{
        console.log("test");
        //response.redirect("/login");
        
    })
    .catch((error)=>{
        console.log(error+"");
    });
    //response.send("speaker add");
});
// authenticationRouter.post("/register",(request,response)=>{
//     // response.render("authentication/register");

//     response.redirect("/speakers/add");
// });

module.exports=authenticationRouter;
