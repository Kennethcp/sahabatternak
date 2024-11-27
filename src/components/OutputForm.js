import React, { useState } from "react";
import avatar from "../assets/logo_ibu.svg";

const OutputForm = ({ onSubmit, closeForm }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [formData, setFormData] = useState({
    supplier: "",
    jumlah: "",
  });

  const characters = [
    { id: 1, name: "Ibu Supriman", image: avatar },
    { id: 2, name: "Ibu Sukijah", image: avatar },
    { id: 3, name: "Mbak Yanto", image: avatar },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCharacter && formData.supplier && formData.jumlah) {
      const newRow = {
        kode: selectedCharacter,
        pukul: new Date().toLocaleTimeString(),
        nama: characters.find((c) => c.id === selectedCharacter).name,
        supplier: formData.supplier,
        jumlah: formData.jumlah,
        kualitas: formData.kualitas || "Baik", // Default value if not filled
      };
      onSubmit(newRow);
      setFormData({ supplier: "", jumlah: "", kualitas: "" });
      setSelectedCharacter(null);
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
                onClick={() => setSelectedCharacter(character.id)}
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
            type="text"
            value={formData.supplier}
            onChange={handleInputChange}
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
            type="number"
            value={formData.jumlah}
            onChange={handleInputChange}
            className="flex-1 rounded-lg border border-darkgreen py-2 px-3 text-darkgreen shadow-sm focus:border-greentext focus:ring-greentext"
          />
        </div>


        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-1/2 bg-darkgreen text-white font-semibold py-2 px-4 rounded-[18px] hover:bg-green-700"
            disabled={!selectedCharacter || !formData.supplier || !formData.jumlah}
          >
            Input
          </button>
          <button
            type="button"
            className="w-1/2 bg-redbutton text-white font-semibold py-2 px-4 rounded-[18px] hover:bg-red-700"
            onClick={closeForm}
          >
            Reject
          </button>
        </div>
      </form>
    </div>
  );
};

export default OutputForm;
