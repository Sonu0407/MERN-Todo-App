import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  postTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers.js";

const route = Router();

route.get("/", getAllTasks);

route.get("/:id", getTaskById);

route.post("/", postTask);

route.put("/:id", updateTask);

route.delete("/:id", deleteTask);

export default route;
