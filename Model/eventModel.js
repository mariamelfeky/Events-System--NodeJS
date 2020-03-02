mongoose = require("mongoose");
eventSchema = new mongoose.Schema({
    
    _id:Number,
    title:{
        type:String,
        required:true},
    eventDate: String,
    mainSpeaker : {type:Number,ref:"speakers"},
    otherSpeakers:[{type:Number,ref:"speakers"}],
});

mongoose.model("events",eventSchema);