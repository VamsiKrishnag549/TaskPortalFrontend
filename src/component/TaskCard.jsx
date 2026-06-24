import {
  Calendar,
  Clock3,
  Flag,
  Trash2,
  Pencil
} from "lucide-react";

function TaskCard({
  task,
  onDelete,
  onStatusChange,
  onEdit
}) {

  const priorityColor = {
    HIGH: "text-red-400",
    MEDIUM: "text-yellow-400",
    LOW: "text-green-400",
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-purple-500/30 transition">

      <div className="flex justify-between items-start">

        <h3 className="text-2xl font-bold">
          {task.title}
        </h3>

        <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
          {task.status}
        </span>

      </div>

      <p className="text-slate-400 mt-4">
        {task.description}
      </p>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-2">
          <Flag size={16} />
          <span>
            Priority:
          </span>

          <span
            className={
              priorityColor[
                task.priority
              ]
            }
          >
            {task.priority}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} />
          Due Date:
          {task.dueDate}
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={16} />
          Estimated:
          {task.estimatedTime ||
            "--"}
        </div>

      </div>

      <div className="border-t border-slate-800 mt-6 pt-5 flex justify-between items-center">

        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(
              task.id,
              e.target.value
            )
          }
          className="bg-slate-800 px-4 py-3 rounded-xl border border-slate-700"
        >
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

        <div className="flex gap-3">

  <button
    onClick={() => onEdit(task)}
    className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-5 py-3 rounded-xl hover:bg-blue-500/20 transition"
  >
    <div className="flex items-center gap-2">
      <Pencil size={16} />
      Edit
    </div>
  </button>

  <button
    onClick={() => onDelete(task.id)}
    className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3 rounded-xl hover:bg-red-500/20 transition"
  >
    <div className="flex items-center gap-2">
      <Trash2 size={16} />
      Delete
    </div>
  </button>

</div>

      </div>

    </div>
  );
}

export default TaskCard;