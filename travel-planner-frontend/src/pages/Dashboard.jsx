// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { authFetch } from "../api/api";
// function Dashboard() {
//   const [trip, setTrip] = useState(null);
//   const [trips, setTrips] = useState([]);
//   const navigate = useNavigate();

// useEffect(() => {
//   authFetch("/api/trips")
//     .then(data => {
//       console.log("Trips API data:", data);

//       if (data && data.length > 0) {
//         setTrip(data[0]);
//       }
//     })
//     .catch(err => {
//       console.error("Dashboard error:", err);
//     });
// }, []);



//   if (!trip) return <p>Loading dashboard...</p>;




  
//   return (



    
//     <div className="dashboard">

// <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//   <h1>Dashboard</h1>

//   <Link to="/create">
//     <button style={{
//       backgroundColor: "#2563eb",
//       color: "white",
//       padding: "10px 16px",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer",
//       fontWeight: "600"
//     }}>
//       ➕ Create Trip
//     </button>
//   </Link>
// </div>

//       {/* Trip Overview */}
//       {/* <div className="card">
//         <h2>📍 {trip.destination}</h2>
//         <p>📅 {trip.startDate} → {trip.endDate}</p>
//         <span className="badge">{trip.status}</span>
//       </div> */}
// <div className="card">
//   <h2>📍 {trip.destination}</h2>
//   <p>📅 {trip.startDate} → {trip.endDate}</p>
// </div>

//       {/* Countdown */}
//       <div className="card">
//         <h3>⏳ Trip Info</h3>
//         <p>{trip.dayInfo}</p>
//       </div>

//       {/* Today’s Plan */}
//       <div className="card">
//         <h3>📌 Today’s Plan</h3>
//         {trip.todaysPlan ? (
//           <p>{trip.todaysPlan}</p>
//         ) : (
//           <p>No plan added for today</p>
//         )}
//       </div>

//       {/* Weather (UI placeholder) */}
//       <div className="card">
//         <h3>🌤 Weather</h3>
//         <p>{trip.destination}</p>
//         <p>☀️ 28°C</p>
//       </div>

//       {/* Pending Checklist */}
// <div className="card">
//   <h3>📦 Pending Checklist</h3>

//   {(!trip.pendingChecklist || trip.pendingChecklist.length === 0) ? (
//     <p>All packed 🎉</p>
//   ) : (
//     <ul>
//       {trip.pendingChecklist.slice(0, 3).map((item, i) => (
//         <li key={i}>{item}</li>
//       ))}
//     </ul>
//   )}
// </div>


//       {/* Quick Actions */}
//       <div className="card">
//         <h3>⚡ Quick Actions</h3>
// <button onClick={() => navigate(`/trip/${trip.id}`)}>
//           View Trip
//         </button>
//       </div>
//       <Link to="/trips">
//   <button style={{ marginLeft: "10px" }}>
//     📂 My Trips
//   </button>
// </Link>


//     </div>
//   );
// }

// export default Dashboard;



// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { authFetch } from "../api/api";
// import { 
//   Plus, 
//   MapPin, 
//   Calendar, 
//   CloudSun, 
//   CheckCircle2, 
//   ChevronRight, 
//   LayoutGrid, 
//   Clock,
//   Navigation
// } from "lucide-react"; // npm install lucide-react

// function Dashboard() {
//   const [trip, setTrip] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     authFetch("/api/trips")
//       .then(data => {
//         if (data && data.length > 0) {
//           setTrip(data[0]);
//         }
//       })
//       .catch(err => console.error("Dashboard error:", err));
//   }, []);

//   if (!trip) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-slate-500 font-medium">Loading your world...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 font-sans text-slate-900">
//       {/* --- TOP NAV BAR --- */}
//       <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
//         <div>
//           <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
//             Dashboard
//           </h1>
//           <p className="text-slate-500 font-medium mt-1">Welcome back, Traveler.</p>
//         </div>
//         <div className="flex gap-3">
//             <Link to="/trips" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
//                 <LayoutGrid size={18}/> My Trips
//             </Link>
//             <Link to="/create" className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
//                 <Plus size={18}/> <span className="hidden xs:inline">Create Trip</span>
//             </Link>
//         </div>
//       </div>

//       {/* --- BENTO GRID START --- */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
        
//         {/* MAIN DESTINATION CARD (Large) */}
//         <div className="md:col-span-2 md:row-span-2 relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl group cursor-pointer" onClick={() => navigate(`/trip/${trip.id}`)}>
//           <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          
//           <div className="relative h-full flex flex-col justify-between">
//             <div className="flex justify-between items-start">
//               <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
//                 Active Trip
//               </span>
//               <button className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
//                 <Navigation size={20}/>
//               </button>
//             </div>
            
//             <div>
//               <div className="flex items-center gap-2 mb-2 text-blue-400">
//                  <MapPin size={24} />
//                  <span className="text-xl font-bold tracking-tight">Main Target</span>
//               </div>
//               <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">{trip.destination}</h2>
//               <div className="flex items-center gap-4 text-slate-300 font-medium">
//                  <div className="flex items-center gap-2">
//                    <Calendar size={18}/>
//                    <span>{trip.startDate}</span>
//                  </div>
//                  <ChevronRight size={16} />
//                  <span>{trip.endDate}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* WEATHER WIDGET (Small) */}
//         <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden">
//           <div className="flex justify-between items-start">
//             <div className="p-3 bg-amber-50 rounded-2xl text-amber-500">
//                <CloudSun size={24} />
//             </div>
//             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Local Weather</span>
//           </div>
//           <div>
//             <span className="text-4xl font-black text-slate-900 leading-none">28°C</span>
//             <p className="text-slate-500 font-medium text-sm mt-1 capitalize">{trip.destination}</p>
//           </div>
//         </div>

//         {/* COUNTDOWN/DAY INFO (Small) */}
//         <div className="bg-indigo-600 rounded-[2.5rem] p-6 text-white flex flex-col justify-between shadow-xl shadow-indigo-100">
//           <div className="flex justify-between items-start">
//             <div className="p-3 bg-white/10 rounded-2xl">
//                <Clock size={24} />
//             </div>
//             <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Journey Status</span>
//           </div>
//           <div>
//             <p className="text-lg font-bold leading-tight">{trip.dayInfo || "Adventure is calling!"}</p>
//           </div>
//         </div>

//         {/* TODAY'S PLAN (Medium) */}
//         <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm md:col-span-1 flex flex-col gap-4">
//            <div className="flex items-center gap-2">
//               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
//               <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Today's Focus</h3>
//            </div>
//            <p className="text-slate-900 font-bold leading-snug">
//             {trip.todaysPlan || "No plan added. Time to explore spontaneously!"}
//            </p>
//         </div>

//         {/* PENDING CHECKLIST (Medium) */}
//         <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm md:col-span-1 flex flex-col justify-between">
//            <div>
//              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Unpacked Items</h3>
//              <ul className="space-y-3">
//                {(!trip.pendingChecklist || trip.pendingChecklist.length === 0) ? (
//                  <li className="flex items-center gap-2 text-emerald-600 font-bold text-sm italic">
//                     <CheckCircle2 size={16}/> Fully Packed!
//                  </li>
//                ) : (
//                  trip.pendingChecklist.slice(0, 2).map((item, i) => (
//                    <li key={i} className="flex items-center gap-3 text-slate-600 font-semibold text-sm">
//                       <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
//                       {item}
//                    </li>
//                  ))
//                )}
//              </ul>
//            </div>
//            <button onClick={() => navigate(`/trip/${trip.id}`)} className="text-blue-600 font-bold text-xs hover:underline flex items-center gap-1 mt-4">
//              Full List <ChevronRight size={14}/>
//            </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Dashboard;




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

