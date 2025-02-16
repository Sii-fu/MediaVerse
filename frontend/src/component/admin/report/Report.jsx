// Report.jsx
import React, { useState } from 'react';
import './Report.css';

const dummyData = [
  { reporter: 'Steve Nate', reportId: 'AB123', reportType: 'Spam', userType: 'General', status: 'Pending', date: '12.01.2013' },
  // Add more dummy rows as needed
  ...Array(9).fill({ reporter: 'Steve Nate', reportId: 'AB123', reportType: 'Spam', userType: 'General', status: 'Pending', date: '12.01.2013' }),
];

const Report = () => {
  const [filter, setFilter] = useState({
    regions: ['User'],
    categories: ['Spam'],
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

  return (
    <div className="report-container">
      <div className="filter-panel">
        <h3>Filter</h3>
        <div>
          <h4>Regions</h4>
          <label>
            <input
              type="checkbox"
              checked={filter.regions.includes('User')}
              onChange={() => handleFilterChange('regions', 'User')}
            />
            User
          </label>
          <label>
            <input
              type="checkbox"
              checked={filter.regions.includes('Company')}
              onChange={() => handleFilterChange('regions', 'Company')}
            />
            Company
          </label>
          <label>
            <input
              type="checkbox"
              checked={filter.regions.includes('Medias')}
              onChange={() => handleFilterChange('regions', 'Medias')}
            />
            Medias
          </label>
        </div>
        <div>
          <h4>General</h4>
          <label>
            <input
              type="checkbox"
              checked={filter.categories.includes('Spam')}
              onChange={() => handleFilterChange('categories', 'Spam')}
            />
            Spam
          </label>
          {/* Add more filter options as needed */}
        </div>
        <button onClick={() => setFilter({ regions: [], categories: [] })}>Clear</button>
      </div>

      <div className="report-list">
        <div className="summary">
          <h2>List of active reports</h2>
          <button>Export to Excel</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Reporter</th>
              <th>Report ID</th>
              <th>Report Type</th>
              <th>User Type</th>
              <th>Status</th>
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
                <td>{row.status}</td>
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
