import { Link } from "react-router";
import { Calendar } from "lucide-react";
import "../styles/TaskCard.css";
import toast from "react-hot-toast";

const TaskCard = ({ task, setTasks }) => {
  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:8080/api/tasks/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      // response
      if (data) {
        toast.success("Task Delete Successfully");
        setTasks((prev) => prev.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.log("Error in deleting the Task", error);
    }
  };

  return (
    <div className="card-radio">
      <input
        type="radio"
        className="radio-input"
        name="task"
        onClick={() => handleDelete(task._id)} // dont need prevent default event so e in function
      />
      <Link to={`/tasks/${task._id}`} className="card-header">
        <div className="card-body">
          <h3 className="card-title">{task.title}</h3>
          <span className="card-createdAt">
            <Calendar
              size={15}
              color="red"
              strokeWidth={2}
              className="calendar"
            />
            {new Date(task.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default TaskCard;
