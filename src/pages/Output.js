import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTableOutput";
import Header from "../components/Header";
import OutputForm from "../components/OutputForm.js";
import { supabase } from "../lib/supabaseClient";

const Output = () => {
  const [data, setData] = useState([]);
  const [totalDiolah, setTotalDiolah] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // Fetch isi tabel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData, error } = await supabase.from("data_entries").select("*");
        if (error) throw error;

        // Filter data untuk hanya menyertakan entri dengan nama_pekerja yang tidak null
        const filteredData = (fetchedData || []).filter(item => item.nama_pekerja !== null);

        setData(filteredData);

        // Calculate total jumlah
        const total = filteredData.reduce((sum, item) => sum + (parseInt(item.jumlah, 10) || 0), 0);
        setTotalDiolah(total);

        console.log(filteredData);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);

  const characters = [
    { id: 1, name: "Ibu Supriman" },
    { id: 2, name: "Ibu Sukijah" },
    { id: 3, name: "Mbak Yanto" },
  ];

  const closeForm = () => setShowForm(false);

  const handleSubmit = (newData) => {
    const pekerja = characters.find((char) => char.id === newData.kode);

    if (pekerja) {
      const updatedData = {
        ...newData,
        nama: pekerja.name,
      };

      setData((prevData) => [...prevData, updatedData]);
      setTotalDiolah((prevTotal) => prevTotal + parseInt(updatedData.jumlah, 10));
    }

    closeForm();
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50 relative">
      <Header />
      <main className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto mt-6 px-4 flex-1">
        <div className="w-full lg:w-2/3 p-4">
          <DataTable data={data} />
        </div>
        <div className="w-full lg:w-1/3 p-4 flex flex-col justify-between relative">
          <div className="bg-darkgreen text-white rounded-lg px-6 py-4 text-center mb-6">
            <h2 className="text-sm font-medium">TOTAL PRODUKSI</h2>
            <p className="text-4xl font-bold mt-2">{totalDiolah} liter</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-darkgreen text-white rounded-[18px] px-4 py-3 text-[28px] font-poppins font-semibold mt-auto"
          >
            Ambil Susu
          </button>
          {showForm && (
            <div
              className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-start z-50 pt-12"
              onClick={closeForm}
            >
              <div
                className="relative pt-28 pr-24"
                onClick={(e) => e.stopPropagation()}
              >
                <OutputForm
                  onSubmit={handleSubmit}
                  closeForm={closeForm}
                  characters={characters}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Output;
