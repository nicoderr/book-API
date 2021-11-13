require("dotenv").config();

//Framework
const express = require("express"); //import express
const mongoose = require("mongoose");


//importing API 
const Books = require("./API/book");
const Authors = require("./API/author");
const Publications = require("./API/publication");

//intialization
const OurAPP = express();

//Configuration
OurAPP.use(express.json());

//Connecting mongodb
mongoose.connect(process.env.MONGO_URL,  
 {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
 })
 .then(() => console.log("Connection established!"))
 .catch((err) => {
   console.log(err);
 })


OurAPP.use("/book", Books);
OurAPP.use("/author", Authors);
OurAPP.use("/publication", Publications);

OurAPP.get("/", (req,res) =>  {
  res.json({ message : "Request Served !!!!!!!"});
});


OurAPP.listen(4000, ()=> console.log("Server is running"));  



