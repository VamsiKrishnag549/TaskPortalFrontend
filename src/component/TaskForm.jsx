import { useState, useEffect } from "react";
import { PlusSquare } from "lucide-react";


function TaskForm({ onSubmit, aiData, editingTask,
  setEditingTask }) {

  const [task, setTask] =
    useState({
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
      status: "TODO",
    });

    useEffect(() => {
  if (editingTask) {
    setTask({
      title: editingTask.title || "",
      description: editingTask.description || "",
      priority: editingTask.priority || "MEDIUM",
      dueDate: editingTask.dueDate || "",
      status: editingTask.status || "TODO",
    });
  }
}, [editingTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...task,
      description:
        aiData?.description ||
        task.description,
      priority:
        aiData?.priority ||
        task.priority,
    });

    setTask({
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
      status: "TODO",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl"
    >

      <h2 className="text-3xl font-bold mb-2">
  {editingTask ? "Edit Task" : "Create Task"}
</h2>

      <p className="text-slate-400 mb-6">
        Fill task details
      </p>

      <div className="space-y-4">

        <input
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          className="w-full bg-slate-800 rounded-xl px-4 py-4 border border-slate-700"
        />

        <textarea
          rows="4"
          name="description"
          value={
            aiData?.description ||
            task.description
          }
          onChange={handleChange}
          placeholder="Description"
          className="w-full bg-slate-800 rounded-xl px-4 py-4 border border-slate-700"
        />

        <div className="grid grid-cols-2 gap-4">

          <select
            name="priority"
            value={
              aiData?.priority ||
              task.priority
            }
            onChange={handleChange}
            className="bg-slate-800 rounded-xl px-4 py-4 border border-slate-700"
          >
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="bg-slate-800 rounded-xl px-4 py-4 border border-slate-700"
          />

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold"
        >
          <div className="flex justify-center items-center gap-2">
            <PlusSquare size={18} />
            {editingTask ? "Update Task" : "Create Task"}
          </div>
        </button>

      </div>

    </form>
  );
}

export default TaskForm;