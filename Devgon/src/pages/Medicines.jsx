import React, { useEffect, useState } from "react";
import { db } from "../Firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import MedicineCard from "../components/MedicineCard";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      setError("");
      try {
        const q = query(collection(db, "medicines"), orderBy("name"));
        const querySnapshot = await getDocs(q);
        const meds = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMedicines(meds);
      } catch (err) {
        setError("Failed to load medicines: " + err.message);
      }
      setLoading(false);
    };
    fetchMedicines();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4 md:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Available Medicines
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading medicines...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : medicines.length === 0 ? (
          <p className="text-center text-gray-500">No medicines found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((med) => (
              <MedicineCard
                key={med.id}
                id={med.id}
                name={med.name}
                description={med.description}
                price={med.price}
                imageUrl={med.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicines;
