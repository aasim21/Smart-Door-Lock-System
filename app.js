const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Key=require("./models/keys.js");
const Log=require("./models/logs.js");




//Estabilishing connection between server and Database
const Mongo_URL="mongodb://127.0.0.1:27017/iot_project";
main().then(()=>{
    console.log("Connection established with DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(Mongo_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));


//Create Route

app.post("/fingerprint", async(req,res)=>{
    let newUser= req.body.User;
    newUser.method="Fingerprint";
     newUser=new Key(newUser);
    await newUser.save();
    res.redirect("/home");
});

app.post("/card", async(req,res)=>{
    let newUser= req.body.User;
    newUser.method="Card";
     newUser=new Key(newUser);
    await newUser.save();
    res.redirect("/home");
});


//Index Route
app.get("/home",async(req,res)=>{
    const allKeys= await Key.find({});
    const allLogs=await Log.find({});
    res.render("index.ejs",{allKeys,allLogs});
});

//Show Route

app.post("/checkin",async(req,res)=>{
    let flag=0;
    let {id}=req.body; 
    let fingerData=await Key.find({});
         for(let data of fingerData){
              if(data.id==id){
                let newLog= new Log({
                    fid:id,
                    login_at:new Date(),
                    status:"Success"
                });
                newLog.save();
                flag==1;
            }
        }
        if(flag==0){

            let newLog=new Log({
                id:0,
                login_at:new Date(),
                status:"Failed"
            });
            newLog.save();
        }
});


app.use((req,res)=>{
    res.send("Page Not Found");
});



app.listen(8080,()=>{
    console.log("Server is listening on 8080");
});