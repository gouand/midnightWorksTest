const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser  = require('body-parser');
const dotenv = require('dotenv');
 // initialize firebase
admin.initializeApp(functions.config().firebase);
dotenv.config();
 // create and setting express app 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


// register routes
const authRoute = require('./routes/auth');
const dataOfIpRoute = require('./routes/dataOfIp');
app.use("/api/user", authRoute);
app.use("/api", dataOfIpRoute);

// create server and listen 3000 port
app.listen(process.env.PORT, ()=>{
    console.log("Server listening on 3000 port")
}); 