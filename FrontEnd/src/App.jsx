import { useState } from "react";
import Add from "./Add";
import List from "./Pages/List";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    fetch("http://localhost:2024/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task added successfully:", data);
        setTasks([...tasks, data]);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <Add addTask={addTask} />
        <List tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
