const Btnsdiv=document.querySelectorAll(".outer-btn");
const unlockBtn=document.querySelector("#unlock-btn");
const lockBtn=document.querySelector("#lock-btn");
const iconBack=document.querySelector(".icon");
const icSp=document.querySelector("#ic-sp");
const icon=document.querySelector("#lock-icon");
const cancelIcon=document.querySelector("#cancel-icon");
const fingerprintContainer=document.querySelector(".fingerprint-container");
const addFingerBtn=document.querySelector("#fngr");
const addCardBtn=document.querySelector("#card");
const mainContainer=document.querySelector(".main-container");
const msgSendBtn=document.querySelector("#send-message");
const form=document.querySelector("#detail");
const formSubBtn=document.querySelector("#form-submit");

//Changing the styles of Lock and Unlock Button 

unlockBtn.addEventListener("click",async()=>{
    iconBack.classList.add("green");
    icSp.classList.add("green-i");
    icSp.classList.remove("red-i");
    icon.classList.remove("fa-lock");
    icon.classList.add("fa-unlock");
    Btnsdiv[1].classList.add("active-green");
    Btnsdiv[0].classList.remove("active-red");
});

lockBtn.addEventListener("click",()=>{
    iconBack.classList.remove("green");
    icSp.classList.remove("green-i");
    icSp.classList.add("red-i");
    icon.classList.add("fa-lock");
    icon.classList.remove("fa-unlock");
    Btnsdiv[1].classList.remove("active-green");
    Btnsdiv[0].classList.add("active-red");
});





//Controlling Lock Remotely

lockBtn.addEventListener("click",async()=>{
    try{
    let result=await axios.get("http://192.168.43.47:80/lock");
    console.log(result);
    }
    catch(err){
        console.log(err);
    }
});
unlockBtn.addEventListener("click",async()=>{
    try{
    let result=await axios.get("http://192.168.43.47:80/unlock");
    console.log(result);
    }
    catch(e){
        console.log(e);
    };
});



cancelIcon.addEventListener("click",()=>{
    fingerprintContainer.classList.add("hidden");
    mainContainer.classList.remove("hidden");
});

//Opening the form for adding new User

addFingerBtn.addEventListener("click",()=>{
    mainContainer.classList.add("hidden");
    fingerprintContainer.classList.remove("hidden");
    form.action="http://localhost:8080/fingerprint";
    formSubBtn.innerText="Add Fingerprint";
});

addCardBtn.addEventListener("click",()=>{
    mainContainer.classList.add("hidden");
    fingerprintContainer.classList.remove("hidden");
    form.action="http://localhost:8080/card";
    formSubBtn.innerText="Add Card";
});

//Sending request to add fingerprint
addFingerBtn.addEventListener("click",async ()=>{
    let result=await axios.get("http://192.168.43.47:80/enroll");
    console.log(result);
});


//Sending Your Manually Typed Message

msgSendBtn.addEventListener("click",async()=>{
    let message=document.querySelector("#msg-area").value;
    let result=await axios.get(`http://192.168.43.47:80/message?message=${message}`);
    console.log(result);
});


