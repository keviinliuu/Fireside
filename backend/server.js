const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.FIRESIDE_DB_URI;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    wtimeoutMS: 2500,
    useUnifiedTopology : true 
}) .catch(err => {
    console.error(err.stack);
    process.exit(1);
}) .then(() => {
    app.listen(port, () => {
        console.log(`Server is listening port ${port}`);
    });
}); 

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

const usersRouter = require('./routes/signup');
const authRouter = require('./routes/auth');

app.post('/signup', usersRouter);
app.post('/login', authRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Oops. Looks like you took a wrong turn somewhere!"}));
