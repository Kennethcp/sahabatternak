import React, { useState } from "react";
import logo from "../assets/logo.svg";
import graph from "../assets/graph_supplier.svg";
import { format } from "date-fns";
import DatePicker from "../components/DatePicker";

const DashboardSupplier = () => {

  
  const [startDate, setStartDate] = useState(new Date(2024, 10, 11)); // Default: 11 November 2024
  const [endDate, setEndDate] = useState(new Date(2024, 10, 12)); // Default: 12 November 2024
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
  
  const suppliers = [
    {
      rank: 1,
      name: "Peternak Jago",
      detail: { liter: "10", hasil: "5.50", rate: "0.55" },
    },
    {
      rank: 2,
      name: "Peternak Ayam",
      detail: { liter: "8", hasil: "4.40", rate: "0.55" },
    },
    {
      rank: 3,
      name: "Peternak Kupu-kupu",
      detail: { liter: "7", hasil: "3.85", rate: "0.55" },
    },
    {
      rank: 4,
      name: "Peternak Ayam Jago",
      detail: { liter: "12", hasil: "6.60", rate: "0.55" },
    },
    {
      rank: 5,
      name: "Pt Ternak Sapi",
      detail: { liter: "15", hasil: "8.25", rate: "0.55" },
    },
  ];

  const [hoveredSupplier, setHoveredSupplier] = useState(null);
  const calculateStats = (suppliers) => {
    const totalLiter = suppliers.reduce((sum, supplier) => sum + parseFloat(supplier.detail.liter), 0);
    const totalHasil = suppliers.reduce((sum, supplier) => sum + parseFloat(supplier.detail.hasil), 0);
    const avgRate = suppliers.reduce((sum, supplier) => sum + parseFloat(supplier.detail.rate), 0) / suppliers.length;
  
    return [
      { label: "Jumlah Susu Diolah", value: totalLiter.toFixed(0), unit: "liter" },
      { label: "Hasil Produksi", value: totalHasil.toFixed(2), unit: "kg" },
      { label: "Rata-rata Conversion Rate", value: avgRate.toFixed(3), unit: "kg/l" },
    ];
  };
  
  // Recalculate stats
  const stats = calculateStats(suppliers);

  return (
    <div>
      {/* Header */}
      <header className="text-center w-full flex items-center bg-gradient-to-r from-lightgreen to-green text-greentext font-extrabold h-[138px]">
        <img src={logo} className="px-10 w-40" alt="Logo" />
        <h1 className="text-4xl font-bold pl-14">DASHBOARD SUPPLIER CV. SAHABAT TERNAK</h1>
      </header>

      {/* Periode Section */}
      <div className="text-center mt-4">
        <h1 className="font-poppins font-bold text-[31px] text-greentext">Periode</h1>
        <div className="flex justify-center items-center gap-6 mt-2">
          <div>
            <button
              onClick={() => setIsStartDatePickerOpen(!isStartDatePickerOpen)}
              className="text-greentext font-semibold text-[20px] cursor-pointer border-b-2 border-greentext"
            >
              {startDate ? format(startDate, "dd MMMM yyyy") : "Select Start Date"}
            </button>
            {isStartDatePickerOpen && (
              <DatePicker
                selectedDate={startDate}
                onDateSelect={(date) => {
                  if (date <= endDate) {
                    setStartDate(date);
                  } else {
                    alert("Tanggal mulai tidak boleh lebih besar dari tanggal akhir");
                  }
                  setIsStartDatePickerOpen(false);
                }}
                onClose={() => setIsStartDatePickerOpen(false)}
              />
            )}
          </div>
          <span className="text-greentext font-bold text-[22px]">—</span>
          <div>
            <button
              onClick={() => setIsEndDatePickerOpen(!isEndDatePickerOpen)}
              className="text-greentext font-semibold text-[20px] cursor-pointer border-b-2 border-greentext"
            >
              {endDate ? format(endDate, "dd MMMM yyyy") : "Select End Date"}
            </button>
            {isEndDatePickerOpen && (
              <DatePicker
                selectedDate={endDate}
                onDateSelect={(date) => {
                  if (date >= startDate) {
                    setEndDate(date);
                  } else {
                    alert("Tanggal akhir tidak boleh lebih kecil dari tanggal mulai");
                  }
                  setIsEndDatePickerOpen(false);
                }}
                onClose={() => setIsEndDatePickerOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Section: Chart */}
        <div className="col-span-3 bg-white p-6 rounded-lg">
          <div className="rounded-lg flex items-center justify-center">
            <img src={graph} alt="Graph" />
          </div>
        </div>

        {/* Right Section: Top Suppliers and Stats */}
        <div className="col-span-2 bg-white p-6 rounded-xl relative">
          <h2 className="text-3xl font-bold font-poppins rounded-[14px] text-white py-[7px] bg-darkgreen mb-4 text-center">
            Top Supplier
          </h2>
          <ul className="space-y-4 relative">
            {suppliers.map((supplier) => (
              <li
                key={supplier.rank}
                className="flex gap-4 relative"
                onMouseEnter={() => setHoveredSupplier(supplier)}
                onMouseLeave={() => setHoveredSupplier(null)}
              >
                <div className="bg-darkgreen text-white w-12 h-8 flex items-center justify-center rounded-[21px] font-bold px-4 py-2">
                  {supplier.rank}
                </div>
                <div className="flex-grow px-4 py-0.5 h-8 rounded-3xl border border-darkgreen">
                  <span className="text-darkgreen font-medium">{supplier.name}</span>
                </div>
                {hoveredSupplier?.rank === supplier.rank && (
                  <div className="absolute left-20 top-[-100px] bg-white border-2 border-darkgreen rounded-[42px] shadow-lg p-6 w-[351px] z-10 bg-opacity-80 backdrop-blur font-poppins">
                    <h3 className="text-center font-bold text-greentext text-xl mb-4">
                      {supplier.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-greentext font-medium">Jumlah diolah</p>
                        <p className="text-greentext text-4xl font-bold">
                          {supplier.detail.liter}
                        </p>
                        <p className="text-greentext">liter</p>
                      </div>
                      <div>
                        <p className="text-greentext font-medium">Hasil</p>
                        <p className="text-greentext text-4xl font-bold">
                          {supplier.detail.hasil}
                        </p>
                        <p className="text-greentext">kg</p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-greentext font-medium">Conversion Rate</p>
                      <p className="text-greentext text-4xl font-bold">
                        {supplier.detail.rate}
                      </p>
                      <p className="text-greentext">l/kg</p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Additional Info */}
          <div className="flex flex-col items-center space-y-4 pt-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="w-full max-w-md bg-white border-2 border-darkgreen rounded-[21px] p-6 text-center shadow-md relative"
              >
                <p className="text-greentext font-medium  font-poppins text-[14px] absolute top-[12px] left-1/2 transform -translate-x-1/2">
                  {stat.label}
                </p>
                <p className="text-greentext font-bold font-poppins text-6xl mt-4">
                  {stat.value} <span className="text-3xl font-medium font-poppins">{stat.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSupplier;
