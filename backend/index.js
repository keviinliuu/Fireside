// import mongodb from "mongodb";
import app from "./server.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 4000;
const uri = process.env.FIRESIDE_DB_URI;

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    wtimeout: 2500,
    useUnifiedTopology : true 
}) .catch(err => {
    console.error(err.stack);
    process.exit(1);
}) .then(() => {
    app.listen(port, () => {
        console.log(`Server is listening port ${port}`);
    });
}); 




/*
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})
*/

/*

// Implementation w/ official MongoDB driver

const MongoClient = mongodb.MongoClient;

MongoClient.connect(
    uri,
    {
        wtimeout: 2500,
        useNewUrlParse: true
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    }) 
*/