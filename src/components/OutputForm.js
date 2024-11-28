import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { parse, format, isValid } from 'date-fns';
import avatar from "../assets/logo_ibu.svg";

const OutputForm = ({ onSubmit, closeForm }) => {
  const todayDate = format(new Date(), 'yyyy-MM-dd');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [formData, setFormData] = useState({
    supplier: "",
    jumlah: "",
    tanggal: todayDate,
    kode: null,
    nama_pekerja: null,
  });

  const characters = [
    { id: 1, name: "Ibu Supriman", image: avatar },
    { id: 2, name: "Ibu Sukijah", image: avatar },
    { id: 3, name: "Mbak Yanto", image: avatar },
  ];

  const handleCharacterSelect = (characterId, name) => {
    setSelectedCharacter(characterId);
    setFormData((prevData) => ({
      ...prevData,
      kode: characterId, // Simpan ID karakter
      nama_pekerja: name // Simpan nama pekerja
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();

    // Validasi: Pastikan semua field diisi
    if (selectedCharacter && formData.supplier && formData.jumlah) {
      const updatedData = {
        ...formData,
        kualitas: status, // Set kualitas berdasarkan tombol yang diklik
        pukul: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Ambil waktu saat ini
      };

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
          onSubmit(data[0]); // Gunakan data yang dikembalikan dari Supabase
        }

        console.log("Data submitted:", data);
        alert("Data berhasil disimpan!");
        closeForm();
      } catch (error) {
        console.error("Error submitting data:", error.message);
        alert("Terjadi kesalahan saat mengirim data.");
      }
    } else {
      alert("Semua field harus diisi!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white bg-opacity-10 backdrop-blur p-6 rounded-[20px] shadow-lg w-[1063px] max-w-md border-2 border-darkgreen">
      <form
        className="flex flex-col space-y-6 w-full font-poppins font-semibold text-sm"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <p className="text-darkgreen font-semibold mb-4">Silakan Pilih Pengambil</p>
          <div className="flex justify-around">
            {characters.map((character) => (
              <button
                key={character.id}
                type="button"
                onClick={() => handleCharacterSelect(character.id, character.name)} // Tambahkan nama
                className={`flex flex-col items-center border-2 rounded-lg p-4 ${
                  selectedCharacter === character.id
                    ? "border-darkgreen bg-opacity-20"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-16 h-16 mb-2"
                />
                <span className="text-darkgreen">{character.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="supplier"
            className="w-1/3 text-sm font-semibold text-darkgreen"
          >
            Supplier
          </label>
          <input
            id="supplier"
            name="supplier"
            type="text"
            value={formData.supplier}
            onChange={handleChange}
            className="flex-1 rounded-lg border border-darkgreen py-2 px-3 text-darkgreen shadow-sm focus:border-greentext focus:ring-greentext"
          />
        </div>

        <div className="flex items-center">
          <label
            htmlFor="jumlah"
            className="w-1/3 text-sm font-semibold text-darkgreen"
          >
            Jumlah
          </label>
          <input
            id="jumlah"
            name="jumlah"
            type="number"
            value={formData.jumlah}
            onChange={handleChange}
            className="flex-1 rounded-lg border border-darkgreen py-2 px-3 text-darkgreen shadow-sm focus:border-greentext focus:ring-greentext"
          />
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, "OK")} // Pass "OK" status
            className="w-1/2 bg-darkgreen text-white font-semibold py-2 px-4 rounded-[18px] hover:bg-green-700"
          >
            Input
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, "Rejected")} // Pass "Rejected" status
            className="w-1/2 bg-red text-white font-semibold py-2 px-4 rounded-[18px] hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </form>
    </div>
  );
};

export default OutputForm;
