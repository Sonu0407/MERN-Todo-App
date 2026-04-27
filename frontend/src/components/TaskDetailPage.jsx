import { useEffect, useState } from "react";
import "../styles/TaskDetailPage.css";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

const TaskDetailPage = () => {
  const [task, setTask] = useState("");
  const [save, setSave] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  //   grab values from the URL.
  // example: <Route path="/tasks/:id" element={<TaskDetails />} />
  // url: /tasks/123
  // useParams: { id: "123" }

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const url =
          import.meta.env.MODE === "development"
            ? `http://localhost:8080/api/tasks/${id}`
            : `/api/tasks/${id}`;
        const response = await fetch(url, {
          method: "GET",
        });

        const data = await response.json(); // changing to json object

        console.log(data);
        setTask(data);
      } catch (error) {
        console.log("Error while fetching tasks", error);
        toast.error("Internal Server Error");
      }
    };

    fetchTask();
  }, [id]); // runs once

  const handleDelete = async () => {
    try {
      const url =
        import.meta.env.MODE === "development"
          ? `http://localhost:8080/api/tasks/${id}`
          : `/api/tasks/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      // response
      if (data) {
        toast.success("Task Delete Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Error in deleting the Task", error);
      toast.error("Failed to delete");
    }
  };

  const handleSave = async () => {
    if (!task.title.trim()) {
      toast.error("Please Enter the title for the task to update");
      return;
    }

    setSave(true);

    try {
      const url =
        import.meta.env.MODE === "development"
          ? `http://localhost:8080/api/tasks/${id}`
          : `/api/tasks/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
        }),
      });

      const data = await response.json();

      if (data) {
        toast.success("Task updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Error in updating the handleSave", error);
      toast.error("failed to update the task");
    } finally {
      setSave(false);
    }
  };

  return (
    <div className="taskdetail-card">
      <div className="taskdetail-card-body">
        <div className="taskdetail-card-content">
          <div className="back-h1">
            <Link to={"/"} className="back-link">
              <ArrowLeftIcon className="arrow-left-icon" />
              Back
            </Link>
          </div>
          <h1 className="taskdetail-title">Your Task details here!</h1>
          <input
            type="text"
            className="input-field"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <div className="taskdetails-actions">
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
            <button className="update" onClick={handleSave} disabled={save}>
              {save ? "Updating..." : "Update Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
