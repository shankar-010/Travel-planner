// import { useEffect, useState } from "react";
// import { authFetch } from "../api/api";

// function Checklist({ tripId }) {
//   const [items, setItems] = useState([]);

//   const loadChecklist = () => {
// authFetch(`/api/checklist/${tripId}`)
//   .then(data => setItems(Array.isArray(data) ? data : []));
//   }

//   useEffect(() => {
//     loadChecklist();
//   }, [tripId]);

// const togglePacked = async (itemId, packed) => {
//   try {
//     await fetch(
//       `http://localhost:8080/api/checklist/${itemId}/packed?packed=${!packed}`,
//       {
//         method: "PUT"
//       }
//     );

//     loadChecklist(); // refresh after update
//   } catch (error) {
//     console.error("Error updating checklist item", error);
//     alert("Failed to update checklist item");
//   }
// };


//   if (items.length === 0) {
//     return <p>No checklist items yet.</p>;
//   }

//   return (
//     <ul>
// {Array.isArray(items) && items.map(item => (
//         <li key={item.id}>
//           <input
//             type="checkbox"
//             checked={item.packed}
//             onChange={() => togglePacked(item.id, item.packed)}
//           />
//           {" "}
//           {item.itemName} ({item.category})
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default Checklist;


import { useEffect, useState } from "react";
import { authFetch } from "../api/api";

function Checklist({ tripId }) {
  const [items, setItems] = useState([]);

  const loadChecklist = async () => {
    try {
      const data = await authFetch(`/api/checklist/${tripId}`);
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    if (tripId) loadChecklist();
  }, [tripId]);

  const togglePacked = async (itemId, packed) => {
    try {
      await authFetch(
        `/api/checklist/${itemId}/packed?packed=${!packed}`,
        { method: "PUT" }
      );
      loadChecklist();
    } catch (err) {
      console.error(err);
      alert("Failed to update checklist item");
    }
  };

  if (!items.length) return <p>No checklist items yet.</p>;

  // ✅ GROUP ITEMS BY CATEGORY (THIS WAS MISSING)
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-3">📦 Packing Checklist</h3>

      {Object.entries(grouped).map(([category, list]) => (
        <div key={category} className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">
            {category}
          </h4>

          {list.map(item => (
            <label
              key={item.id}
              className="flex items-center gap-2 mb-1"
            >
              <input
                type="checkbox"
                checked={item.packed}
                onChange={() => togglePacked(item.id, item.packed)}
              />
              <span
                className={
                  item.packed
                    ? "line-through text-gray-400"
                    : ""
                }
              >
                {item.itemName}
              </span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Checklist;
