import React, { useState } from "react";

const InputForm = ({ addData }) => {
  const [formData, setFormData] = useState({
    kode: "",
    supplier: "",
    jumlah: "",
    tanggal: "",
    pukul: "",
    kualitas: "OK", // Reset status to default
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, status) => {
    e.preventDefault();
    if (Object.values(formData).every((field) => field.trim() !== "")) {
      const updatedData = { ...formData, status };
      if (status === "Rejected") {
        updatedData.kualitas = "Hijau"; // Adjust kualitas for rejected
      }
      addData(updatedData);
      setFormData({
        kode: "",
        supplier: "",
        jumlah: "",
        tanggal: "",
        pukul: "",
        kualitas: "OK", // Reset kualitas to default
      });
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <form className="w-full max-w-md bg-white p-6">
      {["kode", "supplier", "jumlah", "tanggal", "pukul"].map((field) => (
        <div key={field} className="mb-4">
          <input
            id={field}
            name={field}
            type="text"
            value={formData[field]}
            onChange={handleChange}
            placeholder={capitalize(field)}
            className="w-full border border-darkgreen rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-darkgreen font-poppins text-center font-semibold"
            required
          />
        </div>
      ))}
      <button
        type="button"
        onClick={(e) => handleSubmit(e, "OK")} // Pass "OK" status
        className="w-full bg-darkgreen text-white rounded-2xl py-2 mt-4 hover:bg-darkgreen hover:opacity-80 font-semibold font-poppins"
      >
        Accept
      </button>
      <button
        type="button"
        onClick={(e) => handleSubmit(e, "Rejected")} // Pass "Rejected" status
        className="w-full bg-red text-white rounded-2xl py-2 mt-4 font-semibold font-poppins"
      >
        Reject
      </button>
    </form>
  );
};

export default InputForm;
