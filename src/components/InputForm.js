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

  const handleDateInput = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ""); // Hapus karakter non-angka
    let formattedValue = value;
  
    // Tambahkan "/" secara otomatis
    if (value.length >= 3 && value.length <= 4) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else if (value.length > 4) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
    }
  
    setFormData({ ...formData, tanggal: formattedValue });
  };

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
      {["kode", "supplier", "jumlah"].map((field) => (
        <div key={field} className="relative mb-6">
          {/* Input Field */}
          <input
            id={field}
            name={field}
            type="text"
            value={formData[field]}
            onChange={handleChange}
            className="peer w-full border-2 border-darkgreen rounded-xl p-4 pt-6 focus:outline-none focus:ring-2 focus:ring-darkgreen text-green-900 placeholder:opacity-0 font-poppins font-semibold"
            placeholder={field.toUpperCase()}
            required
          />
          {/* Floating Label */}
          <label
            htmlFor={field}
            className="absolute left-4 top-0 text-darkgreen text-sm font-extrabold font-poppins transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base  peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-700"
          >
            {field.toUpperCase()}
          </label>
        </div>
      ))}

      {/* Tanggal Field */}
      <div className="relative mb-6">
        <input
          id="tanggal"
          name="tanggal"
          type="text"
          value={formData.tanggal}
          onChange={handleDateInput}
          maxLength={10} // Untuk memastikan format tidak melebihi dd/MM/yyyy
          className="peer w-full border-2 border-darkgreen rounded-xl p-4 pt-6 focus:outline-none focus:ring-2 focus:ring-darkgreen text-darkgreen placeholder:opacity-0 font-poppins font-semibold "
          placeholder="DD/MM/YYYY"
          required
        />
        {/* Floating Label */}
        <label
          htmlFor="tanggal"
          className="absolute left-4 top-0 text-darkgreen text-sm font-extrabold font-poppins transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-700 "
        >
          TANGGAL
        </label>
      </div>


      {/* Pukul Field */}
      <div className="relative mb-6">
        <input
          id="pukul"
          name="pukul"
          type="time"
          value={formData.pukul}
          onChange={handleChange}
          className="peer w-full border border-darkgreen border-2 rounded-xl p-4 pt-6 focus:outline-none focus:ring-2 focus:ring-darkgreen text-green-900 placeholder-transparent font-poppins font-semibold"
          required
        />
        {/* Floating Label */}
        <label
          htmlFor="pukul"
          className="absolute left-4 top-2 text-darkgreen font-extrabold font-poppins  text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-700"
        >
          PUKUL
        </label>
      </div>

      {/* Buttons */}
      <button
        type="button"
        onClick={(e) => handleSubmit(e, "OK")}
        className="w-full bg-darkgreen text-white text-lg font-bold rounded-full py-3 mt-4 hover:opacity-90 transition duration-200"
      >
        Scan Susu
      </button>
      <button
        type="button"
        onClick={(e) => handleSubmit(e, "Rejected")}
        className="w-full bg-red text-white text-lg font-bold rounded-full py-3 mt-4 hover:opacity-90 transition duration-200"
      >
        REJECT?
      </button>
    </form>
  );
};

export default InputForm;
