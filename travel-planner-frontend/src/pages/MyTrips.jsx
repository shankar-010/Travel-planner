// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { authFetch } from "../api/api";
// function MyTrips() {
//   const [trips, setTrips] = useState([]);
//   const navigate = useNavigate();

// useEffect(() => {
//   authFetch("/api/trips").then(setTrips);
// }, []);

//   const deleteTrip = async (id) => {
//     if (!window.confirm("Delete this trip?")) return;

//     await fetch(`http://localhost:8080/api/trips/${id}`, {
//       method: "DELETE"
//     });

//     setTrips(trips.filter(t => t.id !== id));
//   };

//   return (
//     <div>
//       <h1>🧳 My Trips</h1>

//       {trips.length === 0 && <p>No trips created yet.</p>}

//       {trips.map(trip => (
//         <div key={trip.id} className="card">
//           <h3>{trip.destination}</h3>
//           <p>{trip.startDate} → {trip.endDate}</p>

//           <button onClick={() => navigate(`/trip/${trip.id}`)}>
//             View
//           </button>
// <Link to={`/trip/edit/${trip.id}`}>
//   <button>Edit</button>
// </Link>


//           <button
//             onClick={() => deleteTrip(trip.id)}
//             style={{ color: "red" }}
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyTrips;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { authFetch } from "../api/api";

// function MyTrips() {
//   const [trips, setTrips] = useState([]);

//   useEffect(() => {
//     authFetch("/api/trips")
//       .then(data => setTrips(data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div style={{ maxWidth: "900px", margin: "40px auto" }}>
//       <h2>🧳 My Trips</h2>

//       {trips.length === 0 ? (
//         <p>No trips yet</p>
//       ) : (
//         trips.map(trip => (
//           <div key={trip.id} className="card">
//             <h3>{trip.destination}</h3>
//             <p>📅 {trip.startDate} → {trip.endDate}</p>

//             <Link to={`/trip/${trip.id}`}>
//               <button>View</button>
//             </Link>

//             <Link to={`/trip/edit/${trip.id}`}>
//               <button>Edit</button>
//             </Link>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default MyTrips;



// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { authFetch } from "../api/api";
// import { 
//   MapPin, 
//   Calendar, 
//   ArrowRight, 
//   Settings2, 
//   Plus, 
//   ChevronLeft,
//   PlaneTakeoff 
// } from "lucide-react";

// function MyTrips() {
//   const [trips, setTrips] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     authFetch("/api/trips")
//       .then(data => setTrips(Array.isArray(data) ? data : []))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#FBFBFE] p-6 lg:p-12 font-sans text-slate-900">
      
//       {/* --- HEADER --- */}
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
//         <div className="flex items-center gap-4">
//           <button 
//             onClick={() => navigate("/dashboard")}
//             className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-slate-900 transition-all"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <div>
//             <h1 className="text-4xl font-black tracking-tight text-slate-900">Your Archive</h1>
//             <p className="text-slate-500 font-medium">All your past and future memories.</p>
//           </div>
//         </div>

//         <Link to="/create" className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-[1.5rem] font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
//           <Plus size={20} />
//           Plan New Journey
//         </Link>
//       </div>

//       {/* --- CONTENT --- */}
//       <div className="max-w-7xl mx-auto">
//         {trips.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
//             <PlaneTakeoff size={48} className="text-slate-200 mb-4" />
//             <p className="text-slate-400 font-bold">No trips found in your archive.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {trips.map((trip) => (
//               <div 
//                 key={trip.id} 
//                 className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 border border-slate-100"
//               >
//                 {/* Visual Header (Placeholder Image based on destination) */}
//                 <div className="h-48 w-full bg-slate-100 overflow-hidden relative">
//                   <img 
//                     src={`https://source.unsplash.com/800x600/?${trip.destination},travel`} 
//                     alt={trip.destination}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
//                 </div>

//                 <div className="p-8 pt-2 relative">
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="space-y-1">
//                       <div className="flex items-center gap-1 text-blue-600 text-[10px] font-black uppercase tracking-widest">
//                         <MapPin size={12} />
//                         {trip.tripType || "Adventure"}
//                       </div>
//                       <h3 className="text-2xl font-black text-slate-900">{trip.destination}</h3>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 text-slate-500 font-medium text-sm mb-8">
//                     <Calendar size={16} className="text-slate-300" />
//                     <span>{trip.startDate} — {trip.endDate}</span>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <Link 
//                       to={`/trip/${trip.id}`} 
//                       className="flex-1 bg-slate-900 text-white text-center py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
//                     >
//                       View Plan <ArrowRight size={16} />
//                     </Link>
//                     <Link 
//                       to={`/trip/edit/${trip.id}`} 
//                       className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-100"
//                     >
//                       <Settings2 size={18} />
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyTrips;

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
