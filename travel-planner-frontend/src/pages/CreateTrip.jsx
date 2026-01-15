
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../api/api";
import { ArrowLeft, Calendar, MapPin, Briefcase } from "lucide-react";

function CreateTrip() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    tripType: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authFetch("/api/trips", {
        method: "POST",
        body: JSON.stringify(form)
      });
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900">

      {/* ───── HEADER ───── */}
      <header className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-black transition"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold">
            Create Trip
          </h1>
        </div>
      </header>

      {/* ───── FORM ───── */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Destination
            </label>
            <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-3 focus-within:border-black transition">
              <MapPin size={18} className="text-slate-400" />
              <input
                name="destination"
                value={form.destination}
                onChange={handleChange}
                required
                placeholder="e.g. Kyoto, Japan"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-3">
                <Calendar size={18} className="text-slate-400" />
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                End Date
              </label>
              <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-3">
                <Calendar size={18} className="text-slate-400" />
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Trip Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Trip Type
            </label>
            <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-3">
              <Briefcase size={18} className="text-slate-400" />
              <input
                name="tripType"
                value={form.tripType}
                onChange={handleChange}
                placeholder="e.g. Solo, Business, Family"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2 text-sm text-slate-600 hover:text-black"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Creating…" : "Create Trip"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}

export default CreateTrip;
