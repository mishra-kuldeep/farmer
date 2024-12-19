
"use client";
import { useEffect, useState } from "react";
import ReportsServices from "@/services/ReportServices";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  const [dataSet, setDataSet] = useState([]);
  const [status, setStatus] = useState("day");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const generateLabels = () => {
    const labels = [];
    const currentDate = new Date();

    if (status === "day") {
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() - i);
        labels.unshift(date.toISOString().split("T")[0]);
      }
    } else if (status === "year") {
      for (let i = 0; i < 12; i++) {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - i);
        labels.unshift(date.toLocaleString("default", { month: "long" }));
      }
    }

    return labels;
  };

  const handleStatusChange = (value) => {
    setStatus(value);

    const currentDate = new Date();
    const pastDate = new Date();

    if (value === "day") {
      pastDate.setDate(currentDate.getDate() - 30);
    } else {
      pastDate.setMonth(currentDate.getMonth() - 12);
    }

    setStartDate(pastDate.toISOString().split("T")[0]);
    setEndDate(currentDate.toISOString().split("T")[0]);
  };

  const apiCall = () => {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 30)

    const filter = {
      startDate: startDate || pastDate.toISOString().split("T")[0],
      endDate: endDate || currentDate.toISOString().split("T")[0],
      duration: status
    };

    ReportsServices.farmerRevenue(filter)
      .then(({ data }) => {
        setDataSet(data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  };

  useEffect(() => {
    apiCall();
  }, [status, startDate, endDate]);

  const labels = generateLabels();

  const chartData = labels.map((label) => {
    const match = dataSet.find((item) =>
      status === "day"
        ? item?.date === label
        : new Date(item?.month).toLocaleString("default", { month: "long" }) === label
    );
    return match ? match.Revenue : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: chartData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Farmer Revenue (${status === "day" ? "Daily" : "Yearly"})`,
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="chart-container my-2" style={{ height: "500px" }}>
      <div className="filter-options d-flex w-50 gap-4">
        <label className="cursor">
          <input
            type="radio"
            value="day"
            checked={status === "day"}
            onChange={() => handleStatusChange("day")}
          />
          <span className="m-1">Day</span>
        </label>
        <label>
          <input
            type="radio"
            value="year"
            checked={status === "year"}
            onChange={() => handleStatusChange("year")}
          />
          <span className="m-1">Months</span>
        </label>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}
