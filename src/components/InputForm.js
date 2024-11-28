import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { parse, format, isValid } from 'date-fns';

const InputForm = ({ addData }) => {
  const [formData, setFormData] = useState({
    kode: "",
    supplier: "",
    jumlah: "",
    tanggal: "",
    pukul: "",
    kualitas: "OK", // Default value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();

    if (Object.values(formData).every((field) => field.trim() !== "")) {
      console.log("Tanggal sebelum parsing:", formData.tanggal);

      const parsedDate = parse(formData.tanggal, 'dd/MM/yyyy', new Date());

      if (!isValid(parsedDate)) {
        console.error("Tanggal tidak valid");
        alert("Format tanggal harus dd/MM/yyyy. Silakan periksa kembali.");
        return;
      }

      const formattedDate = format(parsedDate, 'yyyy-MM-dd');

      const updatedData = { ...formData, tanggal: formattedDate, kualitas: status };

      try {
        const { data, error } = await supabase
          .from("data_entries")
          .insert([updatedData]);

        if (error) {
          console.error("Error inserting data:", error.message);
          alert("Terjadi kesalahan saat mengirim data.");
          return;
        }

        if (data && data.length > 0) {
          addData(data[0]);
        }

        setFormData({
          kode: "",
          supplier: "",
          jumlah: "",
          tanggal: "",
          pukul: "",
          kualitas: "OK",
        });
        
        console.log("Data submitted:", data);
      } catch (error) {
        console.error("Error submitting data:", error.message);
        alert("Terjadi kesalahan saat mengirim data.");
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
          type="time"
          value={formData.pukul}
          onChange={handleChange}
          className="w-full border border-darkgreen rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-darkgreen font-poppins text-center font-semibold"
          required
        />
      </div>
      <button
        type="button"
        onClick={(e) => handleSubmit(e, "OK")}
        className="w-full bg-darkgreen text-white rounded-2xl py-2 mt-4 hover:bg-darkgreen hover:opacity-80 font-semibold font-poppins"
      >
        Accept
      </button>
      <button
        type="button"
        onClick={(e) => handleSubmit(e, "Rejected")}
        className="w-full bg-red text-white rounded-2xl py-2 mt-4 font-semibold font-poppins"
      >
        Reject
      </button>
    </form>
  );
};

export default InputForm;
