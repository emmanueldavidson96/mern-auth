import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// Instantiate an application from express
const app = express();

// Application Utilities
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const port = process.env.PORT || 5000

//Database connection
connectDB();

//Server Routes
app.get("/", (req, res) => res.send("server is ready"));
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port  ${port}`));


// Routes or Endpoints to be created
// POST /api/users - Register a user
// POST /api/users/auth - Authenticate a user and get token
// POST /api/users/logout - Logout user and clear cookie
// GET /api/users/profile - Get user profile
// PUT /api/users/profile - Update profile