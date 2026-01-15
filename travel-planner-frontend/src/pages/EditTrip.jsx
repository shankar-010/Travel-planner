// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function EditTrip() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [trip, setTrip] = useState({
//     destination: "",
//     startDate: "",
//     endDate: "",
//     tripType: ""
//   });

//   useEffect(() => {
//     fetch(`http://localhost:8080/api/trips/${id}`)
//       .then(res => res.json())
//       .then(data => setTrip(data));
//   }, [id]);

//   const handleChange = (e) => {
//     setTrip({ ...trip, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch(`http://localhost:8080/api/trips/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(trip)
//     }).then(() => navigate("/trips"));
//   };

//   return (
//     <div>
//       <h1>Edit Trip</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="destination"
//           value={trip.destination}
//           onChange={handleChange}
//           placeholder="Destination"
//           required
//         />

//         <input
//           type="date"
//           name="startDate"
//           value={trip.startDate}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="date"
//           name="endDate"
//           value={trip.endDate}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="tripType"
//           value={trip.tripType}
//           onChange={handleChange}
//           placeholder="Trip type (beach, city...)"
//         />

//         <button type="submit">Update Trip</button>
//       </form>
//     </div>
//   );
// }

// export default EditTrip;



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authFetch } from "../api/api";
import {
  ArrowLeft,
  Save,
  Trash2,
  MapPin,
  Calendar,
  Briefcase
} from "lucide-react";

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    tripType: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* ───── FETCH TRIP ───── */
  useEffect(() => {
    authFetch(`/api/trips/${id}`)
      .then(data => {
        setTrip(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  /* ───── SAVE ───── */
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await authFetch(`/api/trips/${id}`, {
        method: "PUT",
        body: JSON.stringify(trip)
      });
      navigate(`/trip/${id}`);
    } catch {
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  /* ───── DELETE ───── */
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this trip permanently? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await authFetch(`/api/trips/${id}`, {
        method: "DELETE"
      });
      navigate("/trips");
    } catch {
      alert("Failed to delete trip");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-slate-500 text-sm">
        Loading trip…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900">

      {/* ───── HEADER ───── */}
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="text-slate-400 hover:text-black transition"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-semibold">Edit Trip</h1>
          </div>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            <Trash2 size={16} />
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </header>

      {/* ───── FORM ───── */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <form onSubmit={handleSave} className="space-y-8">

          {/* Destination */}
          <Field label="Destination" icon={<MapPin size={18} />}>
            <input
              name="destination"
              value={trip.destination}
              onChange={handleChange}
              required
              className="input"
              placeholder="e.g. Kyoto, Japan"
            />
          </Field>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Start Date" icon={<Calendar size={18} />}>
              <input
                type="date"
                name="startDate"
                value={trip.startDate}
                onChange={handleChange}
                required
                className="input"
              />
            </Field>

            <Field label="End Date" icon={<Calendar size={18} />}>
              <input
                type="date"
                name="endDate"
                value={trip.endDate}
                onChange={handleChange}
                required
                className="input"
              />
            </Field>
          </div>

          {/* Trip Type */}
          <Field label="Trip Type" icon={<Briefcase size={18} />}>
            <input
              name="tripType"
              value={trip.tripType}
              onChange={handleChange}
              placeholder="e.g. Business, Solo, Family"
              className="input"
            />
          </Field>

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
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={16} />
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}

export default EditTrip;

/* ───── REUSABLE FIELD ───── */

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-3 focus-within:border-black transition">
        <span className="text-slate-400">{icon}</span>
        {children}
      </div>
    </div>
  );
}
