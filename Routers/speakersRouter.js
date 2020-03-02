const express = require("express");
speakersRouter = express.Router();
mongoose = require("mongoose");
require("../Model/speakerModel");
speakerModel = mongoose.model("speakers");


speakersRouter.get("/profile",(request,response)=>{
    speakerModel.findOne({_id: request.session._id})
    .then((data)=>{
        response.locals.Name = data.UserName;
        response.render("speakers/speakerProfile",{data});
        //response.send("speaker profile");
    }).catch((error)=>{
        console.log(error+"");
    })

});//profile

speakersRouter.use((request,response,next)=>{
    if(request.session.role =="admin"){
        response.locals.Name = "Mariam";
        next();
    }
    else{
        response.redirect("/login");
    }
})

speakersRouter.get("/list",(request,response)=>{
    speakerModel.find({})
    .then((data)=>{
        response.render("speakers/speakerslist",{data});
       //  response.send(data);
    })
    .catch((error)=>{
        console.log(error+"");
    })
});//list
speakersRouter.get("/add",(request,response)=>{
    response.render("authentication/register");
    
   // response.send("speaker add");
});
speakersRouter.post("/add",(request,response)=>{
    console.log("test...");
    // response.send(request.body);

    let newSpeasker = new speakerModel(
        request.body
        
    ).save()
    .then((data)=>{
        console.log("test")
        response.redirect("/speakers/list");
    })
    .catch((error)=>{
        console.log(error+"");
    });
    //response.send("speaker add");
});//add

// speakersRouter.post("/register",(request,response)=>{
//     console.log("test...");
//     // response.send(request.body);

//     let newSpeasker = new speakerModel(
//         request.body
        
//     ).save()
//     .then((data)=>{
//         console.log("test")
//         response.redirect("/speakers/list");
//     })
//     .catch((error)=>{
//         console.log(error+"");
//     });
//     //response.send("speaker add");
// });


speakersRouter.get("/delete/:id?",(request,response)=>{
    speakerModel.deleteOne({_id:request.params.id})
    .then((data)=>{
        response.redirect("/speakers/list")
        //response.send(data+"deleted")
    })
    .catch((error)=>{

        console.log(error+"");
    });
   // response.send("speaker delete");
});//delete

speakersRouter.get("/edit/:id?",(request,response)=>{
    console.log(request.params);
    speakerModel.find({_id:request.params.id})
    .then((data)=>{
        response.render("speakers/speakerEdit",{data})
    })
    .catch((error)=>{
        console.log(error+"");
    })
   
});//edite
speakersRouter.post("/edit",(request,response)=>{
    speakerModel.update({_id:request.body._id},
         {$set: request.body
    }
        )
        .then((data)=>{
            response.redirect("/speakers/list");
           // response.send(data +"Data updated");
        })
        .catch((error)=>{
            console.log(error+"");
            
        })
 });//edite



module.exports=speakersRouter;