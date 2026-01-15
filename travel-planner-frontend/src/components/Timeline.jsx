
import { useEffect, useState } from "react";
import { authFetch } from "../api/api";

function Timeline({ tripId, trip }) {
  const [days, setDays] = useState([]);
  const [editingDay, setEditingDay] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (!tripId) return;

    authFetch(`/api/timeline/${tripId}`)
      .then(data => setDays(Array.isArray(data) ? data : []))
      .catch(() => setDays([]));
  }, [tripId]);

  const todayIndex =
    Math.floor(
      (new Date() - new Date(trip.startDate)) / 86400000
    ) + 1;

  const startEdit = (day) => {
    setEditingDay(day.id);
    setForm({
      title: day.title,
      description: day.description
    });
  };

  const saveEdit = async (dayId) => {
    await authFetch(`/api/timeline/day/${dayId}`, {
      method: "PUT",
      body: JSON.stringify(form)
    });

    setEditingDay(null);

    const updated = await authFetch(`/api/timeline/${tripId}`);
    setDays(updated);
  };

  if (!days.length) {
    return <p>No timeline generated yet.</p>;
  }

  return (
    <div className="space-y-4">
      {days.map(day => {
        const isToday = day.dayNumber === todayIndex;

        return (
          <div
            key={day.id}
            className={`p-4 rounded-xl border-l-4 ${
              isToday
                ? "bg-blue-50 border-blue-600"
                : "bg-white border-gray-300"
            }`}
          >
            {editingDay === day.id ? (
              <>
                <input
                  className="w-full border p-2 rounded mb-2"
                  value={form.title}
                  onChange={e =>
                    setForm({ ...form, title: e.target.value })
                  }
                />

                <textarea
                  className="w-full border p-2 rounded mb-2"
                  value={form.description}
                  onChange={e =>
                    setForm({ ...form, description: e.target.value })
                  }
                />

                <button
                  onClick={() => saveEdit(day.id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h4 className="font-semibold">
                  Day {day.dayNumber}
                  {isToday && (
                    <span className="ml-2 text-sm text-blue-600">
                      (Today)
                    </span>
                  )}
                </h4>

                <p className="text-gray-600 mt-1">
                  {day.description}
                </p>

                <button
                  onClick={() => startEdit(day)}
                  className="text-sm text-blue-600 mt-2"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;
