import React, { useState, useEffect } from "react";
import DatePicker from "./DatePicker";
import { supabase } from "../lib/supabaseClient";
import { format } from 'date-fns';

const DataTableOutput = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataForDate = async (date) => {
      try {
        const formattedDate = format(date, 'yyyy-MM-dd');
        console.log('Fetching data for date:', formattedDate);
        const { data: fetchedData, error } = await supabase
          .from('data_entries')
          .select('*')
          .eq('tanggal', formattedDate);

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          console.log('Data fetched:', fetchedData);
          setData(fetchedData || []);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataForDate(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  return (
    <div>
      <h2 className="mb-4 text-greentext font-poppins font-extrabold text-[50px]">
        Daftar Produksi Susu
      </h2>
      <div className="relative mb-4">
        {/* Tanggal Label and Button */}
        <div className="flex items-center">
          <h2 className="text-greentext font-poppins font-semibold text-[17px] mr-2">
            Tanggal:
          </h2>
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="text-greentext font-poppins font-semibold text-[17px] border-b-2 border-darkgreen focus:outline-none"
          >
            {selectedDate.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </button>
        </div>

        {/* Custom DatePicker Component */}
        {isDatePickerOpen && (
          <div className="absolute left-0 top-full mt-2 z-10">
            <DatePicker
              selectedDate={selectedDate}
              onDateSelect={handleDateChange}
              onClose={() => setIsDatePickerOpen(false)} // Close the overlay
            />
          </div>
        )}
      </div>

      {/* Table Data */}
      <table className="w-full border-collapse font-semibold border font-poppins text-greentext">
        <thead>
          <tr className="bg-white">
            <th className="border-r-0 p-2 border-2">Kode</th>
            <th className="border-x-0 p-2 border-2">Pukul</th>
            <th className="border-x-0 p-2 border-2">Nama Pekerja</th>
            <th className="border-x-0 p-2 border-2">Supplier</th>
            <th className="border-l-0 p-2 border-2">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data
              .filter(item => item.nama_pekerja !== null && item.pukul !== null) // Filter out rows where both are null
              .map((item, index) => (
                <tr
                  key={index}
                  className="text-center even:bg-white odd:bg-lightgrey"
                >
                  <td className="border-darkgreen p-2 border-2">{item.kode}</td>
                  <td className="border-darkgreen p-2 border-2">{item.pukul}</td>
                  <td className="border-darkgreen p-2 border-2">{item.nama_pekerja}</td>
                  <td className="border-darkgreen p-2 border-2">{item.supplier}</td>
                  <td className="border-darkgreen p-2 border-2">{item.jumlah}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="p-4 bg-white border-darkgreen border-2"
              >
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableOutput;
