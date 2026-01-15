
import { useEffect, useState } from "react";
import { authFetch } from "../api/api";
import { MapPin, CheckCircle2, Circle, Trash2, Plus, Sparkles } from "lucide-react";

function FavoritePlaces({ tripId }) {
  const [places, setPlaces] = useState([]);
  const [placeName, setPlaceName] = useState("");
  const [notes, setNotes] = useState("");

  const loadPlaces = async () => {
    try {
      const data = await authFetch(`/api/places/${tripId}`);
      setPlaces(Array.isArray(data) ? data : []);
    } catch {
      setPlaces([]);
    }
  };

  useEffect(() => {
    if (tripId) loadPlaces();
  }, [tripId]);

  const addPlace = async () => {
    if (!placeName) return;
    await authFetch(`/api/places/${tripId}`, {
      method: "POST",
      body: JSON.stringify({ placeName, notes })
    });
    setPlaceName("");
    setNotes("");
    loadPlaces();
  };

  const toggleVisited = async (placeId, visited) => {
    await authFetch(`/api/places/${placeId}/visited?visited=${!visited}`, { method: "PUT" });
    loadPlaces();
  };

  const deletePlace = async (placeId) => {
    await authFetch(`/api/places/${placeId}`, { method: "DELETE" });
    loadPlaces();
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter">The Bucket List.</h2>
          <p className="text-slate-400 font-serif italic mt-2">Curated spots for this journey.</p>
        </div>
        
        {/* --- INLINE ADD FORM --- */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-50">
          <input
            className="px-4 py-2 text-sm font-medium outline-none w-40 md:w-56"
            placeholder="Search or add place..."
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
          />
          <input
            className="hidden md:block px-4 py-2 text-sm text-slate-400 outline-none w-40 border-l border-slate-100"
            placeholder="Short note..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button 
            onClick={addPlace}
            className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-blue-600 transition-all active:scale-90"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* --- PLACES GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.length === 0 ? (
          <div className="col-span-full py-20 text-center rounded-[3rem] border-2 border-dashed border-slate-100 bg-white/50">
            <Sparkles className="mx-auto text-slate-200 mb-4" size={32} />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No spots discovered yet</p>
          </div>
        ) : (
          places.map((place) => (
            <div 
              key={place.id}
              className={`group relative p-8 rounded-[2.5rem] transition-all duration-500 border ${
                place.visited 
                ? "bg-slate-50 border-transparent" 
                : "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <button 
                onClick={() => toggleVisited(place.id, place.visited)}
                className={`absolute top-6 right-6 transition-colors ${
                  place.visited ? "text-emerald-500" : "text-slate-200 hover:text-blue-500"
                }`}
              >
                {place.visited ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>

              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                  <MapPin size={12} className={place.visited ? "text-emerald-400" : "text-blue-400"} />
                  {place.visited ? "Checked Off" : "To Discover"}
                </div>

                <h3 className={`text-xl font-black tracking-tight mb-3 ${place.visited ? "text-slate-400 line-through decoration-2" : "text-slate-900"}`}>
                  {place.placeName}
                </h3>

                {place.notes && (
                  <p className={`text-sm leading-relaxed mb-8 ${place.visited ? "text-slate-300" : "text-slate-500"}`}>
                    {place.notes}
                  </p>
                )}

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-50/50">
                   <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Ref: #{place.id.toString().slice(-4)}</span>
                   <button 
                    onClick={() => deletePlace(place.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FavoritePlaces;