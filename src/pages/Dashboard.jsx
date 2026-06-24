import { useEffect, useState } from "react";

import Navbar from "../component/Navbar";
import TaskCard from "../component/TaskCard";
import TaskForm from "../component/TaskForm";
import AiGenerator from "../component/AiGenerator";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTask
} from "../services/api";

function Dashboard() {
  const [tasks, setTasks] =
    useState([]);

  const [aiData, setAiData] =
    useState(null);

    const [searchTerm, setSearchTerm] =
  useState("");

  const [editingTask, setEditingTask] =
  useState(null);

const [statusFilter, setStatusFilter] =
  useState("ALL");
    

  const loadTasks =
    async () => {
      try {
        const response =
          await getTasks();

        setTasks(
          response.data.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (task) => {
  try {

    if (editingTask) {

      await updateTask(
        editingTask.id,
        {
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: task.dueDate,
        }
      );

      setEditingTask(null);

    } else {

      await createTask(task);

    }

    loadTasks();

  } catch (error) {
    console.log(error);
  }
};

    

  const handleDeleteTask =
    async (id) => {
      try {
        await deleteTask(id);

        loadTasks();
      } catch (error) {
        console.log(error);
      }
    };

  const handleStatusChange =
    async (
      id,
      status
    ) => {
      try {
        await updateTaskStatus(
          id,
          status
        );

        loadTasks();
      } catch (error) {
        console.log(error);
      }
    };

    const totalTasks = tasks.length;

const completedTasks =
  tasks.filter(
    (task) =>
      task.status === "DONE"
  ).length;

const pendingTasks =
  tasks.filter(
    (task) =>
      task.status !== "DONE"
  ).length;

  const filteredTasks =
  tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesStatus =
      statusFilter === "ALL"
        ? true
        : task.status ===
          statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );

  });

  return (
  <div className="min-h-screen bg-[#050816] text-white">

    <Navbar />

    <div className="max-w-[1400px] mx-auto px-6 py-8">

    <div className="grid md:grid-cols-3 gap-5 mb-8">

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

    <h3 className="text-slate-400">
      Total Tasks
    </h3>

    <p className="text-4xl font-bold mt-2">
      {totalTasks}
    </p>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

    <h3 className="text-slate-400">
      Completed
    </h3>

    <p className="text-4xl font-bold text-green-400 mt-2">
      {completedTasks}
    </p>

  </div>

  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

    <h3 className="text-slate-400">
      Pending
    </h3>

    <p className="text-4xl font-bold text-yellow-400 mt-2">
      {pendingTasks}
    </p>

  </div>

</div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        <AiGenerator
          onGenerate={setAiData}
        />

        <TaskForm
  onSubmit={handleCreateTask}
  aiData={aiData}
  editingTask={editingTask}
  setEditingTask={setEditingTask}
/>
    
      </div>
        
      {/* Tasks Header */}
      <div className="flex items-center gap-3 mb-6">

        <h2 className="text-3xl font-bold">
          Your Tasks
        </h2>

        <span className="bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {tasks.length}
        </span>

      </div>

    <div className="flex flex-col md:flex-row gap-4 mb-6">

  <input
    type="text"
    placeholder="Search tasks..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(
        e.target.value
      )
    }
    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3"
  />

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }
    className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3"
  >
    <option value="ALL">
      All Tasks
    </option>

    <option value="TODO">
      TODO
    </option>

    <option value="IN_PROGRESS">
      IN_PROGRESS
    </option>

    <option value="DONE">
      DONE
    </option>

  </select>

</div>
      {/* Task Cards */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
               onEdit={setEditingTask}
            />
          ))}

        </div>
      ) : (
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-16 text-center">

          <h3 className="text-2xl font-semibold text-slate-300">
            No Tasks Yet
          </h3>

          <p className="text-slate-500 mt-2">
            Create your first task using the form above.
          </p>

        </div>
      )}

      {/* Footer */}
      <div className="border-t border-slate-800 mt-12 pt-6 text-center text-slate-500">
        Built with ❤️ using React & Spring Boot
      </div>

    </div>

  </div>
);
}

export default Dashboard;