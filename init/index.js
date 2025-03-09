const mongoose=require("mongoose");
const Keys=require("../models/keys.js");
const Logs=require("../models/logs.js");


//Estabilishing connection between server and Database

const Mongo_URL="mongodb://127.0.0.1:27017/iot_project";
main().then(()=>{
    console.log("Connection established with DB");
}).catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect(Mongo_URL);
};

let log1=new Keys({
    id:1,
    login_at:new Date(),
    status:"Success"
});
const initDB=async ()=>{
    await log1.save();
    console.log("User has been saved");
};

initDB().then(()=>{
    console.log("Function has been executed");
}).catch((err)=>{
    console.log(err);
});

// async function deleteDb(){
// let result=  await Keys.deleteOne({name:"EFGH"});
// console.log(result);
// };

// deleteDb();


