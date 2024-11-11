//connection.js

const userURL =  "mongodb+srv://milind:milind123@mycluster.gyeyur9.mongodb.net/?retryWrites=true&w=majority&appName=myCluster";


import mongoose from "mongoose";

const DataConnection= mongoose.connect(userURL);
  DataConnection.then(data=>{
    console.log(" DB Connected..");
}).catch(err=>{
    console.log("Error during DB Connection...", err);
});

export  default mongoose;