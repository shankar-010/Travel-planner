// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";

// // Fix leaflet icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// function TripMap({ destination, places }) {
//   const [center, setCenter] = useState(null);
//   const [placeMarkers, setPlaceMarkers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 1️⃣ Geocode destination
//   useEffect(() => {
//     if (!destination) return;

//     fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
//     )
//       .then(res => res.json())
//       .then(data => {
//         if (data && data.length > 0) {
//           setCenter([
//             parseFloat(data[0].lat),
//             parseFloat(data[0].lon)
//           ]);
//         }
//       })
//       .catch(() => {
//         setCenter([20.5937, 78.9629]); // India fallback
//       });
//   }, [destination]);

//   // 2️⃣ Geocode favorite places
//   useEffect(() => {
//     if (!center || !Array.isArray(places)) return;

//     const loadPlaces = async () => {
//       const results = [];

//       for (const place of places) {
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${place.placeName} ${destination}`
//           );
//           const data = await res.json();

//           if (data && data.length > 0) {
//             results.push({
//               ...place,
//               lat: parseFloat(data[0].lat),
//               lon: parseFloat(data[0].lon)
//             });
//           }
//         } catch {
//           // skip failed place
//         }
//       }

//       setPlaceMarkers(results);
//       setLoading(false);
//     };

//     loadPlaces();
//   }, [places, center, destination]);

//   if (!center) {
//     return <p>Loading map...</p>;
//   }

//   return (
//     <div className="card">
//       <h2>🗺️ Trip Map</h2>

//       {loading && <p>Loading places on map...</p>}

//       <MapContainer
//         center={center}
//         zoom={12}
//         style={{ height: "400px", width: "100%" }}
//       >
//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* Destination marker */}
//         <Marker position={center}>
//           <Popup>
//             <strong>{destination}</strong>
//           </Popup>
//         </Marker>

//         {/* Favorite places markers */}
//         {placeMarkers.map(place => (
//           <Marker
//             key={place.id}
//             position={[place.lat, place.lon]}
//           >
//             <Popup>
//               ⭐ {place.placeName}
//               {place.visited && " ✔️"}
//               {place.notes && <div>{place.notes}</div>}
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }

// export default TripMap;



import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { MapPin, Navigation, Info } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Modern Custom Marker Icon
const createCustomIcon = (color) => new L.DivIcon({
  html: `<div style="background-color: ${color}; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 15px ${color};"></div>`,
  className: 'custom-marker',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

// Component to handle auto-centering when destination changes
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 12);
  return null;
}

function TripMap({ destination, places }) {
  const [center, setCenter] = useState(null);
  const [placeMarkers, setPlaceMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!destination) return;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      })
      .catch(() => setCenter([20.5937, 78.9629]));
  }, [destination]);

  useEffect(() => {
    if (!center || !Array.isArray(places)) return;

    const loadPlaces = async () => {
      const results = [];
      for (const place of places) {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place.placeName} ${destination}`);
          const data = await res.json();
          if (data && data.length > 0) {
            results.push({
              ...place,
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon)
            });
          }
        } catch (e) { console.error(e); }
      }
      setPlaceMarkers(results);
      setLoading(false);
    };
    loadPlaces();
  }, [places, center, destination]);

  if (!center) return (
    <div className="h-[400px] w-full bg-slate-50 flex items-center justify-center rounded-[2.5rem] border border-slate-100">
      <div className="flex flex-col items-center gap-3">
        <Navigation className="text-slate-200 animate-pulse" size={32} />
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Generating Map View</p>
      </div>
    </div>
  );

  return (
    <div className="relative group">
      {/* Floating Badge */}
      <div className="absolute top-6 left-6 z-[1000] bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/50 flex items-center gap-2">
        <MapPin className="text-blue-600" size={16} />
        <span className="text-xs font-bold text-slate-900 tracking-tight">{destination}</span>
      </div>

      {loading && (
        <div className="absolute inset-0 z-[1001] bg-white/40 backdrop-blur-[2px] flex items-center justify-center rounded-[2.5rem]">
           <div className="bg-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-slate-100">
             <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" /> Locating Places...
           </div>
        </div>
      )}

      <div className="rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl shadow-slate-200/50 grayscale-[0.3] hover:grayscale-0 transition-all duration-700">
        <MapContainer
          center={center}
          zoom={12}
          zoomControl={false} // Cleaner UI
          style={{ height: "450px", width: "100%" }}
        >
          <ChangeView center={center} />
          
          {/* PREMIUM LIGHT THEME TILES */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {/* Main Destination Marker */}
          <Marker position={center} icon={createCustomIcon('#2563eb')}>
            <Popup className="premium-popup">
              <div className="p-1">
                <h4 className="font-black text-slate-900 leading-none mb-1">{destination}</h4>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Base Location</p>
              </div>
            </Popup>
          </Marker>

          {/* Favorite places markers */}
          {placeMarkers.map(place => (
            <Marker
              key={place.id}
              position={[place.lat, place.lon]}
              icon={createCustomIcon(place.visited ? '#10b981' : '#f43f5e')}
            >
              <Popup className="premium-popup">
                <div className="p-1 min-w-[120px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${place.visited ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <h4 className="font-bold text-slate-900 leading-none">{place.placeName}</h4>
                  </div>
                  {place.notes && (
                    <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg italic">"{place.notes}"</p>
                  )}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-tighter text-slate-400">
                    <span>{place.visited ? 'Visited' : 'Planned'}</span>
                    <Info size={12} />
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Map Tip */}
      <p className="text-center mt-4 text-slate-400 text-[10px] font-medium uppercase tracking-[0.2em]">
        Scroll to zoom • Drag to explore
      </p>

      {/* Custom Styles to inject for Leaflet Popups */}
      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-popup-content-wrapper {
          border-radius: 20px !important;
          padding: 8px !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid #f1f5f9 !important;
        }
        .leaflet-popup-tip {
          display: none !important;
        }
        .premium-popup .leaflet-popup-content {
          margin: 12px !important;
        }
      `}} />
    </div>
  );
}

export default TripMap;