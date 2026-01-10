import 'dotenv/config'; // automatically loads .env
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(cookieParser());


//static folder for uploads
app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));

// auth route here
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

//start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})