import express from "express";
import notesRouter from "./routes/tasks.routes.js";
import route from "./routes/tasks.routes.js";
import dotenv from "dotenv";
import db_connect from "./config/db.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
// for port
const PORT = process.env.PORT || 8081;
const __dirname = path.resolve();

// DB connection
db_connect();

//middleware
// 1. to handle CORS error (Cross origin resource sharing)
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

// 1. middleware for accepting json data
app.use(express.json());

// 2. for routes
app.use("/api/tasks", route);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`The server is running at PORT: ${PORT}`);
});
