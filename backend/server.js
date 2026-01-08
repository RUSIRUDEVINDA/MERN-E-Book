require ("dotenv").config()
const express = require ("express");
const cors = require("cors")
const path = require ("path");
const connectDB = require ("./config/db");

const app = express();

//connect to database
connectDB();

//middleware to handle CORS

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

//middleware
app.use(express.json()); // use for converting json data to js objects

//static folder for uploads
app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
})