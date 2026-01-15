import { Link, useLocation } from "react-router-dom";
import { Plane, LayoutGrid, Plus } from "lucide-react";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* BRAND */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <Plane className="text-blue-600" />
          <span className="text-xl font-black tracking-tight text-slate-900">
            TravelSync
          </span>
        </Link>

        {/* ACTIONS */}
        <nav className="flex items-center gap-3">
          <Link
            to="/trips"
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold
              ${pathname === "/trips"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"}
            `}
          >
            <LayoutGrid size={16} />
            My Trips
          </Link>

          <Link
            to="/create"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow"
          >
            <Plus size={16} />
            Create
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
