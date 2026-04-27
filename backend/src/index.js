import express from "express";
import notesRouter from "./routes/tasks.routes.js";
import route from "./routes/tasks.routes.js";
import dotenv from "dotenv";
import db_connect from "./config/db.js";
import cors from "cors";

dotenv.config();
const app = express();
// for port
const PORT = process.env.PORT || 8081;

// DB connection
db_connect();

//middleware
// 1. to handle CORS error (Cross origin resource sharing)
app.use(cors());

// 1. middleware for accepting json data
app.use(express.json());

// 2. for routes
app.use("/api/tasks", route);

app.listen(PORT, () => {
  console.log(`The server is running at PORT: ${PORT}`);
});
