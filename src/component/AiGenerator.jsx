import { useState } from "react";
import { Sparkles } from "lucide-react";
import { generateTaskDetails } from "../services/api";

function AiGenerator({ onGenerate }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);

      const response =
        await generateTaskDetails(title);

      onGenerate(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/20 rounded-3xl p-6 shadow-xl min-h-[320px]">

      <div className="flex justify-between">

        <div>
          <h2 className="text-3xl font-bold mb-2">
            AI Task Generator
          </h2>

          <p className="text-slate-400">
            Let AI help generate task details
          </p>
        </div>

        <div className="hidden md:flex h-24 w-24 rounded-full bg-purple-500/20 items-center justify-center">
          🤖
        </div>

      </div>

      <input
        type="text"
        placeholder="Enter task title..."
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full mt-8 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-purple-500"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full mt-5 bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-xl font-semibold hover:opacity-90"
      >
        <div className="flex justify-center items-center gap-2">
          <Sparkles size={18} />
          {loading
            ? "Generating..."
            : "Generate with AI"}
        </div>
      </button>

      <p className="text-slate-500 text-sm mt-5">
        AI will generate description,
        priority and estimated time.
      </p>

    </div>
  );
}

export default AiGenerator;