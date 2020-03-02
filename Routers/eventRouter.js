const express = require("express");
const eventRouter = express.Router();
mongoose = require("mongoose");
require("../Model/eventModel");
eventModel = mongoose.model("events");


eventRouter.get("/speakerEvent",(request,response)=>{
    speakerModel.findOne({_id:request.session._id})
    .then((data)=>{
        response.locals.Name = data.UserName;
    })
    .catch((error)=>{
        console.log(error+"");
    })

    eventModel.find({$or:[{mainSpeaker:request.session._id},{otherSpeakers:request.session._id}]})
    .then((data)=>{
        response.render("events/speakerEvents",{data:data,id:request.session._id})
    })
    .catch((error)=>{
        console.log(error+"");
    })
})



eventRouter.use((request,response,next)=>{
    if(request.session.role == "admin"){
        response.locals.Name ="Mariam";
    }
    else{
        response.redirect("/login");
    }
})


eventRouter.get("/list",(request,response)=>{
   
   eventModel.find({}).populate({path:"mainSpeaker otherSpeakers"})
   .then((data)=>{
       //console.log(data[0]);
        response.render("events/eventlist",{data});
       //response.send(data);
   }).catch((error)=>{
       console.log(error+"");
   })
});//list

eventRouter.get("/add",(request,response)=>{    

    speakerModel.find({}).populate({path:"mainSpeaker otherSpeakers"})
    .then((data)=>{
        console.log(data);
        response.render("events/eventAdd",{data});
    })
    .catch((error)=>{
        console.log(error+"");
    })
    // response.send("event add");
});

eventRouter.post("/add",(request,response)=>{
    // response.send("event add");
    let newEvent = new eventModel(
        request.body
    ).save()
    .then((data)=>{
        console.log()
       console.log("add new Event");
        response.redirect("/events/list");
    })
    .catch((error)=>{
        console.log(error+"");
    })
});//add


eventRouter.get("/edit/:id?",(request,response)=>{
    eventModel.find({_id:request.params.id})
    .then((data)=>{
        console.log(data);
        speakerModel.find({}).then((speaker)=>{
            console.log(speaker);
            response.render("events/eventEdit",{data:data[0],speaker:speaker})
        })
        .catch((error)=>{
            console.log(error+"");
        })
        
    })
    .catch((error)=>{
        console.log(error+"");
    })
});

eventRouter.post("/edit",(request,response)=>{
    eventModel.updata({_id:request.body._id},{$set:
        request.body
}
    ).then((data)=>{
        request.redirect("/events/list");
    })

   // response.send("event edite");
});

eventRouter.get("/delete/:id?",(request,response)=>{
    //response.send("event delete");

    eventModel.deleteOne({_id:request.params.id})
        .then((data)=>{
            response.redirect("/events/list");
        })
        .catch((error)=>{
            console.log(error+"");
        });
});//delete


module.exports = eventRouter;
