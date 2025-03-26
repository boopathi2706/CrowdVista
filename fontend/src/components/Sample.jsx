import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const Sample = () => {
  const [data, setData] = useState([]);
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");

  // Load Excel file when the app starts
  useEffect(() => {
    fetch("/List.xlsx") // Ensure file is inside public folder
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        
        console.log(parsedData); // Debugging: Check actual column names
        setData(parsedData);
      })
      .catch((error) => console.error("Error loading Excel file:", error));
  }, []);

  // Handle Search
  const handleSearch = () => {
    if (data.length === 0) {
      setName("Data not loaded");
      return;
    }
    const result = data.find((row) => row["Roll No"] == rollNumber);
    setName(result ? result["Student Name"] : "Not Found");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Find Student Name</h1>

      {/* Input & Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 ml-2">
          Search
        </button>
      </div>

      {/* Display Result */}
      {name && <p className="font-semibold">Name: {name}</p>}
    </div>
  );
};

export default Sample;
