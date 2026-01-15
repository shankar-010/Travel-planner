
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authFetch } from "../api/api";
import {
  Plus,
  Calendar,
  Eye,
  Edit,
  Trash2,
  ArrowLeft
} from "lucide-react";

/* -------- Utils -------- */
function getStatus(start, end) {
  const now = new Date();
  if (now < new Date(start)) return "Upcoming";
  if (now > new Date(end)) return "Completed";
  return "In Progress";
}

function statusBadge(status) {
  if (status === "Upcoming") return "bg-blue-100 text-blue-700";
  if (status === "Completed") return "bg-slate-100 text-slate-500";
  return "bg-emerald-100 text-emerald-700";
}

/* -------- Main -------- */
function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    authFetch("/api/trips")
      .then(data => setTrips(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trip permanently?")) return;

    try {
      setDeletingId(id);
      await authFetch(`/api/trips/${id}`, { method: "DELETE" });
      setTrips(prev => prev.filter(t => t.id !== id));
    } catch {
      alert("Failed to delete trip");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900">

      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-slate-400 hover:text-black"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-semibold">My Trips</h1>
          </div>

          <Link
            to="/create"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm"
          >
            <Plus size={14} />
            New Trip
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">

        {trips.length === 0 && (
          <div className="text-center text-slate-500 mt-20">
            <p>No trips created yet.</p>
            <Link
              to="/create"
              className="inline-block mt-3 text-blue-600 hover:underline"
            >
              Create your first trip
            </Link>
          </div>
        )}

        {trips.map(trip => {
          const status = getStatus(trip.startDate, trip.endDate);

          return (
            <div
              key={trip.id}
              className="bg-white border rounded-xl p-4 space-y-4"
            >
              {/* TOP */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="font-semibold text-lg">
                    {trip.destination}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                    <Calendar size={14} />
                    {trip.startDate} → {trip.endDate}
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(status)}`}
                >
                  {status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/trip/${trip.id}`)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm"
                >
                  <Eye size={14} />
                  View
                </button>

                <button
                  onClick={() => navigate(`/trip/edit/${trip.id}`)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg border text-sm"
                >
                  <Edit size={14} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(trip.id)}
                  disabled={deletingId === trip.id}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-red-200 text-red-600 text-sm disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  {deletingId === trip.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default MyTrips;
