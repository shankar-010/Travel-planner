
import { useEffect, useState } from "react";
import { ShieldAlert, PhoneCall, HeartPulse, Flame, LifeBuoy } from "lucide-react";

const FALLBACK_CONTACTS = [
  { serviceType: "POLICE", contactInfo: "100" },
  { serviceType: "AMBULANCE", contactInfo: "108" },
  { serviceType: "FIRE", contactInfo: "101" },
  { serviceType: "EMERGENCY", contactInfo: "112" },
];

function EmergencyHelper({ city }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    const loadContacts = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/emergency/${city}`);
        const data = await res.json();
        setContacts(Array.isArray(data) && data.length > 0 ? data : FALLBACK_CONTACTS);
      } catch {
        setContacts(FALLBACK_CONTACTS);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [city]);

  const getIcon = (type) => {
    const props = { size: 20, strokeWidth: 2.5 };
    switch (type) {
      case "POLICE": return <ShieldAlert {...props} />;
      case "AMBULANCE": return <HeartPulse {...props} />;
      case "FIRE": return <Flame {...props} />;
      default: return <LifeBuoy {...props} />;
    }
  };

  if (loading) return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-2xl w-full" />)}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-rose-600">Local Safety</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Official Support: {city}</p>
        </div>
        <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
          <PhoneCall size={18} />
        </div>
      </div>

      {/* CONTACTS GRID */}
      <div className="grid grid-cols-1 gap-3">
        {contacts.map((c, i) => (
          <a
            key={i}
            href={`tel:${c.contactInfo}`}
            className="group flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[1.5rem] transition-all hover:bg-rose-600 hover:border-rose-600 active:scale-95 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white/20 group-hover:text-white transition-colors">
                {getIcon(c.serviceType)}
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-white transition-colors">
                {c.serviceType}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg font-black tracking-tighter text-slate-900 group-hover:text-white transition-colors">
                {c.contactInfo}
              </span>
              <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-white/30 group-hover:text-white transition-all">
                <PhoneCall size={14} fill="currentColor" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* FOOTER NOTE */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="text-[10px] leading-relaxed text-slate-400 font-medium italic">
          Always prioritize your immediate surroundings. These numbers are pulled based on your destination city and may vary by specific district.
        </p>
      </div>
    </div>
  );
}

export default EmergencyHelper;