import "./styles/App.css";
import HomePage from "./pages/HomePage";
import TaskDetailPage from "./components/TaskDetailPage";
import { Route, Routes } from "react-router";
import { Camera } from "lucide-react";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/tasks/:id" element={<TaskDetailPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
