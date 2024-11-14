import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./ParcelList.css";

const ParcelList = () => {
  const [parcels, setParcels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    owner: "",
    location: "",
    size: "",
    valuation: "",
    area: "",
  });

  useEffect(() => {
    fetch("https://landsearch1.onrender.com/parcels")
      .then((response) => response.json())
      .then((data) => setParcels(data));
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleEditClick = (parcel) => {
    setEditingId(parcel.id);
    setEditData({
      owner: parcel.owner,
      location: parcel.location,
      size: parcel.size,
      valuation: parcel.valuation,
      area: parcel.area,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = (id) => {
    fetch(`https://landsearch1.onrender.com/parcels/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    })
      .then((response) => response.json())
      .then((updatedParcel) => {
        setParcels((prev) =>
          prev.map((parcel) => (parcel.id === id ? updatedParcel : parcel))
        );
        setEditingId(null);
      });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const filteredParcels = parcels.filter(
    (parcel) =>
      parcel.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.id.toString().includes(searchTerm)
  );

  return (
    <div className="parcel-list">
      <h2>Parcel List</h2>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <table>
        <thead>
          <tr>
            <th>Owner</th>
            <th>Location</th>
            <th>Size</th>
            <th>Valuation</th>
            <th>Area</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredParcels.map((parcel) => (
            <tr key={parcel.id}>
              {editingId === parcel.id ? (
                <>
                  <td><input type="text" name="owner" value={editData.owner} onChange={handleInputChange} /></td>
                  <td><input type="text" name="location" value={editData.location} onChange={handleInputChange} /></td>
                  <td><input type="text" name="size" value={editData.size} onChange={handleInputChange} /></td>
                  <td><input type="text" name="valuation" value={editData.valuation} onChange={handleInputChange} /></td>
                  <td><input type="text" name="area" value={editData.area} onChange={handleInputChange} /></td>
                  <td>
                    <button onClick={() => handleSaveClick(parcel.id)}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{parcel.owner}</td>
                  <td>{parcel.location}</td>
                  <td>{parcel.size}</td>
                  <td>{parcel.valuation}</td>
                  <td>{parcel.area}</td>
                  <td>
                    <button onClick={() => handleEditClick(parcel)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelList;
