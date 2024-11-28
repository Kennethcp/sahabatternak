import React, { useState } from "react";
import DatePicker from "./DatePicker"; // Import your custom DatePicker component

const DataTable = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false); // Close the DatePicker after date selection
  };

  return (
    <div>
      <h2 className="mb-4 text-greentext font-poppins font-extrabold text-[50px]">
        Daftar Susu Masuk
      </h2>
      <div className="flex items-center mb-4">
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
        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={handleDateChange}
          onClose={() => setIsDatePickerOpen(false)} // Close the overlay
        />
      )}
      

      <table className="w-full border-collapse font-semibold border font-poppins text-greentext">
        <thead>
          <tr className="bg-white">
            <th className="border-r-0 p-2 border-2">Kode</th>
            <th className="border-x-0  p-2 border-2">Pukul</th>
            <th className="border-x-0 p-2 border-2">Supplier</th>
            <th className="border-x-0  p-2 border-2">Jumlah</th>
            <th className="border-l-0  p-2 border-2">Kualitas</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="text-center even:bg-white odd:bg-lightgrey"
              >
                <td className="border-darkgreen p-2 border-2">{item.kode}</td>
                <td className="border-darkgreen p-2 border-2">{item.pukul}</td>
                <td className="border-darkgreen p-2 border-2">{item.supplier}</td>
                <td className="border-darkgreen p-2 border-2">{item.jumlah}</td>
                <td className="border-darkgreen p-2 border-2">{item.kualitas}</td>
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

export default DataTable;
