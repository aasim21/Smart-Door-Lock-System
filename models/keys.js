const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const keySchema=new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        required:true
    },
    method:{
        type:String,
      }
});

const Key= mongoose.model("Key",keySchema);

module.exports=Key;


