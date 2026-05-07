const express=require("express");
const app=express();
const ejs=require("ejs");


app.set("view engine", "ejs");

const path = require("path");

app.set("views", path.join(__dirname, "views"));


app.get("/", (req, res)=>{
    res.send("hi i am root");
});

app.get("math", (req, res) =>{
    res.render("math.ejs");
});






app.listen(8080, () => {
    console.log("server is listening on port 8080");
});