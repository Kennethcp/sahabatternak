import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import InputForm from "../components/InputForm";
import Header from "../components/Header";
import { supabase } from "../lib/supabaseClient";

const Input = () => {
  const [data, setData] = useState([]);
  const [totalAccepted, setTotalAccepted] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData, error } = await supabase.from("data_entries").select("*");
        if (error) throw error;
  
        setData(fetchedData || []);
        updateTotals(fetchedData || []);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
  
    fetchData();
  }, []);

  const updateTotals = (data) => {
    const accepted = data
      .filter(item => item.kualitas === "OK")
      .reduce((total, item) => total + parseInt(item.jumlah, 10), 0);

    const rejected = data
      .filter(item => item.kualitas === "Rejected")
      .reduce((total, item) => total + parseInt(item.jumlah, 10), 0);

    setTotalAccepted(accepted);
    setTotalRejected(rejected);
  };

  const addData = async (newData) => {
    try {
      const { data: addedData, error } = await supabase.from("data_entries").insert([newData]);
  
      if (error) throw error;
  
      // Tambahkan data baru ke state
      const updatedData = [...data, addedData[0]];
      setData(updatedData);
  
      // Perbarui total
      updateTotals(updatedData);
    } catch (error) {
      console.error("Error adding data:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <main className="flex flex-col lg:flex-row w-full max-w-6xl mt-6">
        <div className="w-full lg:w-2/3 p-4">
          <DataTable data={data} />
        </div>
        <div className="w-full lg:w-1/3 bg-green-100 p-4 flex flex-col items-center pb-4 relative h-screen">
          <div className="w-full flex-grow">
            <div className="bg-darkgreen text-white rounded-lg px-6 py-4 text-center mb-4">
              <h2 className="text-sm font-medium">TOTAL SUSU MASUK OK</h2>
              <p className="text-4xl font-bold mt-2">{totalAccepted} liter</p>
            </div>
            <div className="bg-darkgreen text-white rounded-lg px-6 py-4 text-center">
              <h2 className="text-sm font-medium">TOTAL SUSU REJECTED</h2>
              <p className="text-4xl font-bold mt-2">{totalRejected} liter</p>
            </div>
          </div>
          {!showForm ? (
            <button
              className="bg-darkgreen text-white rounded-[18px] px-4 py-2 text-[40px] font-poppins font-semibold w-full max-w-[90%] sticky bottom-4"
              onClick={() => setShowForm(true)}
            >
              Scan Susu
            </button>
          ) : (
            <InputForm addData={addData} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Input;
