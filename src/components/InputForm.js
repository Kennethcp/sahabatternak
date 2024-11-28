import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // Import the initialized Supabase client

const InputForm = ({ addData }) => {
  const [formData, setFormData] = useState({
    kode: "",
    supplier: "",
    jumlah: "",
    tanggal: "",
    pukul: "",
    kualitas: "OK", // Default quality value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();

    if (Object.values(formData).every((field) => field.trim() !== "")) {
      const updatedData = { ...formData, status };

      try {
        // Insert data directly into Supabase table
        const { data, error } = await supabase
          .from("data_entries") // Replace with your table name
          .insert([updatedData]);

        if (error) {
          throw new Error(error.message);
        }

        console.log("Data submitted:", data);

        // Reset form after successful submission
        setFormData({
          kode: "",
          supplier: "",
          jumlah: "",
          tanggal: "",
          pukul: "",
          kualitas: "OK",
        });

        // Notify parent component
        addData(updatedData);
      } catch (error) {
        console.error("Error submitting data:", error.message);
      }
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <form className="w-full max-w-md bg-white p-6">
      {["kode", "supplier", "jumlah", "tanggal"].map((field) => (
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
      <div className="mb-4">
        <input
          id="pukul"
          name="pukul"
          type="time" // Change input type to "time"
          value={formData.pukul}
          onChange={handleChange}
          className="w-full border border-darkgreen rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-darkgreen font-poppins text-center font-semibold"
          required
        />
      </div>
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
