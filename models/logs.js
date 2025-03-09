const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const logSchema =new Schema({
      id:{
         type:Number,
        required:true,
      },
      
      login_at:{
        type:Date,
        required:true
      },
      status:{
        type:String
      },
});

const Log=mongoose.model("Log",logSchema);

module.exports=Log;