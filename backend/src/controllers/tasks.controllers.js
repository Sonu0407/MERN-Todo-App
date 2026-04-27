import Task from "../models/task.models.js";

export const getAllTasks = async (req, res) => {
  try {
    // 3, 2, 1
    const Tasks = await Task.find().sort({ createdAt: -1 }); // gets all data from the database

    res.status(200).json(Tasks);
  } catch (error) {
    console.log("Error while getting all tasks", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const foundTask = await Task.findById(id);

    if (!foundTask) {
      return res.status(404).json({ message: "Not found the task" });
    }
    res.status(200).json(foundTask);
  } catch (error) {
    console.log("Error while getting the task", error);
    res.status(500).json({ message: "Intenal server error" });
  }
};

export const postTask = async (req, res) => {
  try {
    // take input from body
    const { title } = req.body;
    const newTask = new Task({
      title: title,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log("Error while adding the task", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
      },
      {
        new: true, // if false Mongo updates the document BUT returns the old(previous) data itself so new: true is important
      },
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(201).json(updatedTask);
  } catch (error) {
    console.log("Error while updating the task", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deleteTask) {
      res.status(404).json({ message: "Task not found to delete" });
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    console.log("Error while deleting the task", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
