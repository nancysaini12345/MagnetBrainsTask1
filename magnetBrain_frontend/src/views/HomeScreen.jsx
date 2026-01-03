

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, updateTaskStatus, deleteTask } from "../api.js";
import TaskModal from "../components/Modal/TaskModal.jsx";
import { Autocomplete, TextField } from "@mui/material";
import { convertDateFormat } from "../helper/formateDate.js";

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taskSelected, setTaskSelected] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const tasks = await getTasks(token);
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const filteredArray = tasks.filter((item) => {
      return (!status || item.status === status) && (!priority || item.priority === priority);
    });
    setSortedTasks(filteredArray);
  }, [priority, status, tasks]);

  const handleTaskStatus = async (taskId) => {
    const token = localStorage.getItem("token");
    await updateTaskStatus(taskId, token);
    const tasks = await getTasks(token);
    setTasks(tasks);
  };

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem("token");
    await deleteTask(taskId, token);
    const tasks = await getTasks(token);
    setTasks(tasks);
  };

  return (
    <div className="h-full bg-black text-gray-200 p-8 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white bg-opacity-10 p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Tasks</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Filter:</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-white bg-opacity-5 border border-gray-600 text-white rounded-md p-2"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white bg-opacity-5 border border-gray-600 text-white rounded-md p-2"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition" onClick={() => {
              setStatus("");
              setPriority("");
            }}>Reset</button>
            <button className="bg-green-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition" onClick={() => navigate("/task")}>Create Task</button>
          </div>
        </div>

        <div className="overflow-hidden bg-white bg-opacity-5 shadow-md rounded-lg">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">No tasks available</td>
                </tr>
              ) : (
                sortedTasks.map((task) => (
                  <tr key={task._id} className="border-b border-gray-600 hover:bg-gray-600 transition">
                    <td className="px-6 py-4 cursor-pointer text-white hover:underline" onClick={() => setShowModal(true) || setTaskSelected(task)}>
                      {task.title}
                    </td>
                    <td className="px-6 py-4 text-gray-400">{task.due_date.slice(0, 10)}</td>
                    <td className="px-6 py-4">
                      <Autocomplete
                        size="small"
                        disablePortal
                        options={["pending", "completed"]}
                        value={task.status}
                        onChange={() => handleTaskStatus(task._id)}
                        sx={{ width: 150 }}
                        renderInput={(params) => <TextField {...params} variant="standard" sx={{ input: { color: 'white' } }} />}
                      />
                    </td>
                    <td className={`px-6 py-4 font-bold ${task.priority === "high" ? "text-red-400" : task.priority === "medium" ? "text-yellow-400" : "text-green-400"}`}>
                      {task.priority}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white transition" onClick={() => setShowModal(true) || setTaskSelected(task)}>Read</button>
                      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white transition" onClick={() => navigate(`/task/${task._id}`)}>Edit</button>
                      <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white transition" onClick={() => handleDelete(task._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <TaskModal setShowModal={setShowModal} task={taskSelected} />}
    </div>
  );
};

export default HomeScreen;
