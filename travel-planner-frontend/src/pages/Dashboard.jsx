
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authFetch } from "../api/api";
import {
  Plus,
  Calendar,
  MapPin,
  ArrowRight
} from "lucide-react";

/* ---------- UTILS ---------- */
function getStatus(start, end) {
  const now = new Date();
  if (now < new Date(start)) return "Upcoming";
  if (now > new Date(end)) return "Completed";
  return "In Progress";
}

/* ---------- MAIN ---------- */
function Dashboard() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    authFetch("/api/trips").then(data => {
      if (Array.isArray(data)) setTrips(data);
    });
  }, []);

  const activeTrip = trips[0];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900">

      {/* ───── TOP BAR ───── */}
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>

          <div className="flex items-center gap-3">
            <Link
              to="/trips"
              className="text-sm text-slate-600 hover:text-black"
            >
              My Trips
            </Link>

            <Link
              to="/create"
              className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-slate-800"
            >
              <Plus size={14} className="inline mr-1" />
              New Trip
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* ───── ACTIVE TRIP ───── */}
        <section className="bg-white border rounded-xl p-6">
          <p className="text-xs text-slate-400 uppercase font-semibold mb-3">
            Active Trip
          </p>

          {!activeTrip ? (
            <p className="text-slate-500 text-sm">
              You don’t have any active trips yet.
            </p>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin size={16} />
                  {activeTrip.destination}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {activeTrip.startDate} → {activeTrip.endDate}
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  Status: {getStatus(activeTrip.startDate, activeTrip.endDate)}
                </p>
              </div>

              <button
                onClick={() => navigate(`/trip/${activeTrip.id}`)}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                View
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </section>

        {/* ───── QUICK STATS ───── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Trips" value={trips.length} />
          <StatCard label="Upcoming" value={trips.filter(t => getStatus(t.startDate, t.endDate) === "Upcoming").length} />
          <StatCard label="Completed" value={trips.filter(t => getStatus(t.startDate, t.endDate) === "Completed").length} />
        </section>

        {/* ───── UPCOMING LIST ───── */}
        <section className="bg-white border rounded-xl">
          <div className="px-6 py-4 border-b">
            <h3 className="font-semibold text-sm">Upcoming Trips</h3>
          </div>

          <div className="divide-y">
            {trips.slice(1).length === 0 ? (
              <p className="p-6 text-sm text-slate-500">
                No upcoming trips.
              </p>
            ) : (
              trips.slice(1).map(trip => (
                <div
                  key={trip.id}
                  onClick={() => navigate(`/trip/${trip.id}`)}
                  className="px-6 py-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer"
                >
                  <div>
                    <p className="font-medium">{trip.destination}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      <Calendar size={12} className="inline mr-1" />
                      {trip.startDate}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-slate-400" />
                </div>
              ))
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

/* ---------- SMALL COMPONENT ---------- */
function StatCard({ label, value }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-xs text-slate-400 uppercase font-semibold">
        {label}
      </p>
      <p className="text-2xl font-semibold mt-2">
        {value}
      </p>
    </div>
  );
}

export default Dashboard;

