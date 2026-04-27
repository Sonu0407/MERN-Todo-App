import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import TaskCard from "../components/TaskCard";
import NavBar from "../components/NavBar";
import "../styles/HomePage.css";
import toast from "react-hot-toast";

const HomePage = () => {
  // usestate variables
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url = "http://localhost:8080/api/tasks"; // http://localhost:8080/api/tasks/
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json(); // takes time to convert it
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.log("Error in getting all Tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // runs onces

  return (
    <div className="task-head">
      <NavBar />
      <HomeCard task={tasks} setTasks={setTasks} />
      <div className="">
        <div className="notloading">
          {loading && <h1>loading tasks...</h1>}
          {/* // if task is list empty */}
          {/* {to do for later}  */}

          {tasks.length > 0 && (
            <div className="display-tasks">
              {tasks.map((task) => (
                <div key={task._id}>
                  <TaskCard task={task} setTasks={setTasks} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
