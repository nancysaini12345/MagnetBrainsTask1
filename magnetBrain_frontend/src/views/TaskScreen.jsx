

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask } from "../api";

const TaskScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const token = localStorage.getItem("token");
        const tasks = await getTasks(token);
        const task = tasks.find((t) => t._id === id);
        if (task) {
          setTitle(task.title);
          setDescription(task.description);
          setDueDate(task.due_date);
          setPriority(task.priority);
          setStatus(task.status);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const taskData = { title, description, due_date: dueDate, priority, status };
    id ? await updateTask(id, taskData, token) : await createTask(taskData, token);
    navigate("/");
  };

  console.log("due date",dueDate)

  return (
    <div className="h-full bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white bg-opacity-10 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {id ? "Edit Task" : "Create Task"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full p-3 bg-white text-black rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="w-full p-3 bg-white text-black rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={dueDate.split('T')[0]}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full p-3 bg-white text-black rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 bg-white text-black rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 bg-white text-black rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-blue-700 p-3 rounded-md text-black font-bold transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-md text-black font-bold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskScreen;
