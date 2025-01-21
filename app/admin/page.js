"use client";

import SortinfoDash from '@/component/admin/AdminDashboard/SortinfoDash'
import React, { useState } from 'react'

const AdminHomePage = () => {
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Calculate default dates
  const currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setDate(currentDate.getDate() - 30);

  const [dateRange, setDateRange] = useState({
    fromDate: formatDate(lastMonthDate),
    toDate: formatDate(currentDate),
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value,
    });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-secondary">Dashboard</h3>
        <div className="d-flex justify-content-between align-items-center gap-3 p-0 m-0">
          <div>
            <label className="adjustLabel"> From Date</label>
            <input
              type="date"
              name="fromDate"
              value={dateRange.fromDate}
              onChange={handleChange}
              className="form-control adjustLabel_input shadow-none p-2"
            />
          </div>
          <div>
            <label className="adjustLabel"> To Date</label>
            <input
              type="date"
              name="toDate"
              value={dateRange.toDate}
              onChange={handleChange}
              className="form-control adjustLabel_input shadow-none p-2"
            />
          </div>
        </div>
      </div>
      <div>
        <SortinfoDash dateRange={dateRange} />
      </div>
    </>
  )
}

export default AdminHomePage