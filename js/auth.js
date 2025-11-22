
// AUTH with localStorage persistence
let UserDB = JSON.parse(localStorage.getItem("UserDB") || "[]");

// initialize defaults once only
if(UserDB.length === 0){
 UserDB = [
   {username:"Lucky", password:"0789966218"},
   {username:"Admin", password:"admin123"},
   {username:"TestUser", password:"testpass"},
   {username:"Member01", password:"pass001"},
   {username:"Guest", password:"guestlogin"}
 ];
 localStorage.setItem("UserDB", JSON.stringify(UserDB));
}

function saveDB(){ localStorage.setItem("UserDB", JSON.stringify(UserDB)); }

function registerUser(u,p){
 let exists = UserDB.some(x => x.username.toLowerCase() === u.toLowerCase());
 if(exists) return {success:false, message:"Username already exists"};
 UserDB.push({username:u, password:p});
 saveDB();
 return {success:true, message:"Registration successful"};
}

function validateLogin(u,p){
 let m = UserDB.find(x => x.username.toLowerCase()===u.toLowerCase() && x.password===p);
 if(m) return {success:true, redirect:"ugpay.html"};
 return {success:false, message:"Invalid username or password"};
}

document.addEventListener("DOMContentLoaded", ()=>{

 // LOGIN FORM
 let lf = document.getElementById("loginForm");
 if(lf){
   lf.addEventListener("submit", e=>{
     e.preventDefault();
     let u=document.getElementById("login-username").value.trim();
     let p=document.getElementById("login-password").value.trim();
     let r = validateLogin(u,p);
     if(r.success){
       toastr.success("Welcome back "+u+"!", {timeOut:1000});
       setTimeout(()=>location.href=r.redirect,1000);
     } else {
       toastr.error(r.message);
     }
   });
 }

 // REGISTER FORM
 let rf = document.getElementById("registerForm");
 if(rf){
   rf.addEventListener("submit", e=>{
     e.preventDefault();
     let u=document.getElementById("username").value.trim();
     let p=document.getElementById("password-input").value.trim();
     if(!u||!p){ toastr.error("Fill all required fields"); return; }
     let r = registerUser(u,p);
     if(r.success){
       toastr.success("Account created! Logging in...", {timeOut:1000});
       // auto‑login
       setTimeout(()=>{
         localStorage.setItem("isLoggedIn","true");
         localStorage.setItem("username",u);
         location.href="ugpay.html";
       },1000);
     } else {
       toastr.error(r.message);
     }
   });
 }
});
