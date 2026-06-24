import { LogOut, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="px-6 pt-4">
      <nav className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-3xl px-6 py-5 flex justify-between items-center shadow-xl">

        <div className="flex items-center gap-4">

          <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <CheckSquare size={24} />
          </div>

          <h1 className="text-3xl font-bold">
            AI Task Portal
          </h1>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 px-5 py-3 rounded-xl transition"
        >
          Logout
          <LogOut size={18} />
        </button>

      </nav>
    </div>
  );
}

export default Navbar;