import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/config";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ManageMedicines = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [deletingId, setDeletingId] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editFields, setEditFields] = useState({ name: "", description: "", price: "", image: null, imagePreview: null });
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const q = query(collection(db, "medicines"), orderBy("name"));
      const querySnapshot = await getDocs(q);
      const meds = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMedicines(meds);
    } catch (err) {
      setMessage("Error loading medicines: " + err.message);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        const storage = getStorage();
        const imageRef = ref(storage, `medicines/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "medicines"), {
        name,
        description,
        price: Number(price),
        imageUrl,
      });

      setMessage("Medicine added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
      setImagePreview(null);
      fetchMedicines();
    } catch (error) {
      setMessage("Error adding medicine: " + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this medicine?")) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "medicines", id));
      setMessage("Medicine deleted successfully!");
      fetchMedicines();
    } catch (error) {
      setMessage("Error deleting medicine: " + error.message);
    }
    setDeletingId("");
  };

  // Edit logic
  const startEdit = (med) => {
    setEditingId(med.id);
    setEditFields({
      name: med.name,
      description: med.description,
      price: med.price,
      image: null,
      imagePreview: med.imageUrl || null,
    });
  };

  const handleEditImageChange = (e) => {
    if (e.target.files[0]) {
      setEditFields((prev) => ({
        ...prev,
        image: e.target.files[0],
        imagePreview: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const handleEditFieldChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    setEditLoading(true);
    setMessage("");
    try {
      let imageUrl = editFields.imagePreview;
      if (editFields.image) {
        const storage = getStorage();
        const imageRef = ref(storage, `medicines/${Date.now()}_${editFields.image.name}`);
        await uploadBytes(imageRef, editFields.image);
        imageUrl = await getDownloadURL(imageRef);
      }
      await updateDoc(doc(db, "medicines", id), {
        name: editFields.name,
        description: editFields.description,
        price: Number(editFields.price),
        imageUrl,
      });
      setMessage("Medicine updated successfully!");
      setEditingId("");
      fetchMedicines();
    } catch (error) {
      setMessage("Error updating medicine: " + error.message);
    }
    setEditLoading(false);
  };

  const handleEditCancel = () => {
    setEditingId("");
    setEditFields({ name: "", description: "", price: "", image: null, imagePreview: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-2 md:px-0">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-green-100 mb-10">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Add New Medicine</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter medicine name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                placeholder="Enter price"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter description"
              rows={3}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
            </div>
            {imagePreview && (
              <div className="mt-2 md:mt-0 flex-shrink-0">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-lg border border-green-200 shadow"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#4CAF50] text-white py-2.5 rounded-lg font-semibold shadow hover:bg-green-700 transition text-lg flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Medicine"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-700 font-semibold">{message}</p>}
      </div>

      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-green-800 mb-4">All Medicines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {medicines.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No medicines found.</p>
          )}
          {medicines.map((med) => (
            <div key={med.id} className="bg-white rounded-xl shadow p-4 border border-green-100 flex flex-col items-center relative">
              {editingId === med.id ? (
                <form
                  className="w-full flex flex-col items-center gap-2"
                  onSubmit={e => { e.preventDefault(); handleEditSave(med.id); }}
                >
                  <input
                    type="text"
                    name="name"
                    value={editFields.name}
                    onChange={handleEditFieldChange}
                    className="w-full px-2 py-1 border border-green-200 rounded mb-1"
                    required
                  />
                  <textarea
                    name="description"
                    value={editFields.description}
                    onChange={handleEditFieldChange}
                    className="w-full px-2 py-1 border border-green-200 rounded mb-1"
                    required
                    rows={2}
                  />
                  <input
                    type="number"
                    name="price"
                    value={editFields.price}
                    onChange={handleEditFieldChange}
                    className="w-full px-2 py-1 border border-green-200 rounded mb-1"
                    required
                    min="0"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="w-full mb-1"
                  />
                  {editFields.imagePreview && (
                    <img
                      src={editFields.imagePreview}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded border mb-1"
                    />
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-semibold disabled:opacity-50"
                      disabled={editLoading}
                    >
                      {editLoading ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      className="bg-gray-400 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-semibold"
                      onClick={handleEditCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {med.imageUrl ? (
                    <img src={med.imageUrl} alt={med.name} className="h-32 w-32 object-cover rounded mb-3 border" />
                  ) : (
                    <div className="h-32 w-32 flex items-center justify-center bg-green-50 rounded mb-3 text-gray-400 border">
                      No Image
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-green-900 mb-1 text-center">{med.name}</h4>
                  <p className="text-gray-700 text-center mb-1">{med.description}</p>
                  <p className="text-green-700 font-semibold text-center">₹{med.price}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => startEdit(med)}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded transition font-semibold text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(med.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded transition font-semibold text-sm disabled:opacity-50"
                      disabled={deletingId === med.id}
                    >
                      {deletingId === med.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageMedicines;
