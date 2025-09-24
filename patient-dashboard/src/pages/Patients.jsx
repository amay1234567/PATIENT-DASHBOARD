import { useEffect, useState } from "react";

/**
 * Simple mock data. Replace with a fetch to an API if you want:
 * Example to use JSONPlaceholder users:
 *  fetch("https://jsonplaceholder.typicode.com/users").then(r=>r.json()).then(...)
 */
const MOCK_PATIENTS = [
  { id: 1, name: "Amit Sharma", age: 32, contact: "9876543210", email: "amit@example.com", notes: "Allergic to penicillin" },
  { id: 2, name: "Priya Singh", age: 28, contact: "9123456780", email: "priya@example.com", notes: "Diabetic" },
  { id: 3, name: "Rohit Verma", age: 45, contact: "9988776655", email: "rohit@example.com", notes: "Hypertension" },
  { id: 4, name: "Sneha Patel", age: 36, contact: "9090909090", email: "sneha@example.com", notes: "Regular checkups" },
  { id: 5, name: "Sanjay Rao", age: 50, contact: "9001122334", email: "sanjay@example.com", notes: "Post-operative" },
  { id: 6, name: "Meera Joshi", age: 22, contact: "9112233445", email: "meera@example.com", notes: "Pregnancy — 2nd trimester" }
];

function PatientCard({ patient, onView }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{patient.name}</h3>
        <p className="text-sm text-gray-600">Age: {patient.age}</p>
        <p className="text-sm text-gray-600">Contact: {patient.contact}</p>
      </div>
      <div className="mt-4">
        <button
          onClick={() => onView(patient)}
          className="w-full md:w-auto bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function Modal({ patient, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2">{patient.name}</h2>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Contact:</strong> {patient.contact}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p className="mt-3 text-gray-700"><strong>Notes:</strong> {patient.notes}</p>
        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network request for UI demo; replace with fetch(...) to talk to a real API
    const timer = setTimeout(() => {
      setPatients(MOCK_PATIENTS);
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Patients</h2>

        <div className="w-full md:w-1/2">
          <label className="sr-only" htmlFor="search">Search patients</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full p-2 border rounded shadow-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading patients…</div>
      ) : (
        <>
          {filtered.length === 0 ? (
            <div className="text-center text-gray-600">No patients found.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => (
                <PatientCard key={p.id} patient={p} onView={setSelected} />
              ))}
            </div>
          )}
        </>
      )}

      {selected && <Modal patient={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
