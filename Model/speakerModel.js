mongoose = require("mongoose");
speackerSchema = new mongoose.Schema({
    _id:Number,
    FullName:String,
    UserName:String,
    Password:String,
    Age:Number,
    Address:{
            city:String,
            street:Number,
            building:Number,
        }
});

mongoose.model("speakers",speackerSchema);
