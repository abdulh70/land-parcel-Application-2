import React, { useState } from "react";
import "./AddParcel.css";

const AddParcel = () => {
  const [formData, setFormData] = useState({
    owner: "",
    location: "",
    size: "",
    valuation: "",
    area: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://landsearch1.onrender.com/parcels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(() => alert("Parcel added successfully!"));
  };

  return (
    <form className="add-parcel-form" onSubmit={handleSubmit}>
      <h2>Add New Parcel</h2>
      <input
        type="text"
        name="owner"
        placeholder="Owner"
        value={formData.owner}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="size"
        placeholder="Size"
        value={formData.size}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="valuation"
        placeholder="Valuation"
        value={formData.valuation}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="area"
        placeholder="Area"
        value={formData.area}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Parcel</button>
    </form>
  );
};

export default AddParcel;
