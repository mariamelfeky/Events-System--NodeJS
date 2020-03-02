const express = require("express");
adminRouter = express.Router();

adminRouter.get("/profile",(request,response)=>{
    if(request.session.role == "admin"){
        response.locals.Name ="Mariam"
    response.render("authentication/home");
    }
    else{
        response.render("/login");
    }
});

module.exports = adminRouter;