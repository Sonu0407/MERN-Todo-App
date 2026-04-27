import { useState } from "react";
import toast from "react-hot-toast";
import "../styles/HomeCard.css";

const TaskCard = ({ task, setTasks }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter the task and then submit");
      return;
    }

    try {
      const url =
        import.meta.env.MODE === "developement"
          ? "http://localhost:8080/api/tasks"
          : "/api/tasks";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Infrom server about the data format
        },
        body: JSON.stringify({
          title,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data) {
        toast.success("Successfully added the task");
        // window.location.reload(); // true forces reload from server

        // updating ui wihtout reload
        setTasks((prev) => [data, ...prev]);

        // clear input
        setTitle("");
      }
    } catch (error) {
      console.log("Error while adding task", error);
      toast.error("Failed to create task");
    }
  };
  return (
    <div className="container">
      <h1 className="title">To Do App</h1>
      <div className="actions">
        <input
          type="text"
          className="input"
          placeholder="Task here.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn" onClick={(e) => handleSubmit(e)}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
