// Report.jsx
import React, { useState } from "react";
import "./Report.css";

const dummyData = [
  {
    reporter: "Steve Nate",
    reportId: "AB123",
    reportType: "Spam",
    userType: "General",
    status: "Pending",
    date: "12.01.2013",
  },
  // Add more dummy rows as needed
  ...Array(9).fill({
    reporter: "Steve Nate",
    reportId: "AB123",
    reportType: "Spam",
    userType: "General",
    status: "Pending",
    date: "12.01.2013",
  }),
];

const Report = () => {
  const [filter, setFilter] = useState({
    regions: ["User"],
    categories: ["Spam"],
  });

  const handleFilterChange = (type, value) => {
    setFilter((prev) => {
      const updated = { ...prev };
      if (updated[type].includes(value)) {
        updated[type] = updated[type].filter((item) => item !== value);
      } else {
        updated[type].push(value);
      }
      return updated;
    });
  };

  const downloadExcel = () => {
    const header = ["Reporter", "Report ID", "Report Type", "User Type", "Status", "Date"];
    const rows = dummyData.map(row => [row.reporter, row.reportId, row.reportType, row.userType, row.status, row.date]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + [header, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "report_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="report-container">
      <div className="filter-panel">
        <div>
          <h4>General</h4>
          <label>
            <input
              type="checkbox"
              checked={filter.categories.includes("Spam")}
              onChange={() => handleFilterChange("categories", "Spam")}
            />
            Spam
          </label>
          <label>
            <input
              type="checkbox"
              checked={filter.categories.includes("Harresment")}
              onChange={() => handleFilterChange("categories", "Harresment")}
            />
            Harresment
          </label>
        </div>
        <button onClick={() => setFilter({ regions: [], categories: [] })}>
          Clear
        </button>
      </div>

      <div className="report-list">
        <div className="summary">
          <h2>List of active reports</h2>
          <button onClick={downloadExcel}>Export to Excel</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Reporter</th>
              <th>Report ID</th>
              <th>Report Type</th>
              <th>User Type</th>
              {/* <th>Status</th> */}
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((row, index) => (
              <tr key={index}>
                <td>{row.reporter}</td>
                <td>{row.reportId}</td>
                <td>{row.reportType}</td>
                <td>{row.userType}</td>
                {/* <td>{row.status}</td> */}
                <td>{row.date}</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
