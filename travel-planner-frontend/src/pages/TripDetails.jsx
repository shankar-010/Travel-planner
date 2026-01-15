
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Checklist from "../components/Checklist";
import Timeline from "../components/Timeline";
import TransportNotes from "../components/TransportNotes";
import EmergencyHelper from "../components/EmergencyHelper";
import FavoritePlaces from "../components/FavoritePlaces";
import TripMap from "../components/TripMap";
import { authFetch } from "../api/api";
import { Calendar, MapPin, Briefcase } from "lucide-react";

function TripDetails() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [places, setPlaces] = useState([]);
  const [timelineRefresh, setTimelineRefresh] = useState(false);

  useEffect(() => {
    if (!id) return;

    authFetch(`/api/trips/${id}`)
      .then(data => setTrip(data))
      .catch(() => setTrip(null));

    authFetch(`/api/places/${id}`)
      .then(data => setPlaces(Array.isArray(data) ? data : []))
      .catch(() => setPlaces([]));
  }, [id]);

  if (!trip || !trip.id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading trip details…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-10 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ───────── HEADER ───────── */}
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {trip.destination}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {trip.startDate} → {trip.endDate}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={14} />
              {trip.tripType}
            </span>
          </div>
        </header>

        {/* ───────── CHECKLIST ───────── */}
        <Section
          title="Checklist"
          actionLabel="Generate"
          onAction={async () => {
            await authFetch(`/api/checklist/generate/${trip.id}`, {
              method: "POST"
            });
          }}
        >
          <Checklist tripId={trip.id} />
        </Section>

        {/* ───────── TIMELINE ───────── */}
        <Section
          title="Timeline"
          actionLabel="Generate"
          onAction={async () => {
            try {
              await authFetch(`/api/timeline/generate/${trip.id}`, {
                method: "POST"
              });
              setTimelineRefresh(prev => !prev);
            } catch {
              alert("Failed to generate timeline");
            }
          }}
        >
          <Timeline
            tripId={trip.id}
            trip={trip}
            refresh={timelineRefresh}
          />
        </Section>

        {/* ───────── TRANSPORT ───────── */}
        <Section title="Transport Notes">
          <TransportNotes tripId={trip.id} />
        </Section>

        {/* ───────── FAVORITES ───────── */}
        <Section title="Favorite Places">
          <FavoritePlaces tripId={trip.id} />
        </Section>

        {/* ───────── EMERGENCY ───────── */}
        <Section title="Emergency Helper">
          <EmergencyHelper city={trip.destination} />
        </Section>

        {/* ───────── MAP ───────── */}
        <Section title="Map Overview">
          <TripMap destination={trip.destination} places={places} />
        </Section>

      </div>
    </div>
  );
}

export default TripDetails;

/* ───────── REUSABLE SECTION ───────── */

function Section({ title, actionLabel, onAction, children }) {
  return (
    <section className="bg-white border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-600">
          {title}
        </h2>

        {actionLabel && (
          <button
            onClick={onAction}
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            {actionLabel}
          </button>
        )}
      </div>

      {children}
    </section>
  );
}
