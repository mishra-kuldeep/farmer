
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
    PointElement,
    LineElement,
    ArcElement,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TransporterBarChart() {
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
        } else if (status === "month") {
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

        ReportsServices.totalRevenueTimeWise(filter)
            .then(({ data }) => {
                console.log(data)
                setDataSet(data?.data);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });
    };

    useEffect(() => {
        apiCall();
    }, [status, startDate, endDate]);

    const labels = generateLabels();
    const chartData_1 = labels.map((label) => {
        const match = dataSet.find((item) =>
            status === "day"
                ? item?.date === label
                : new Date(item?.month).toLocaleString("default", { month: "long" }) === label
        );
        return match ? match.transportRevenue : 0;
    });

    const data = {
        labels,
        datasets: [
            {
                label: "Transport Revenue",
                data: chartData_1,
                backgroundColor: '#476f00',
                borderColor: "#476f00",
                borderWidth: 1,
            },
        ],

    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: `Transport Revenue (${status === "day" ? "Daily" : "Yearly"})`,
            },
          },
        scales: {
            x: {
                type: 'category', // Assuming x-axis is categorical
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'grey',
                    font: {
                        weight: 'bold',
                    },
                },
            },
            y: {
                type: 'linear', // Assuming y-axis is linear
                stacked: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: 'grey',
                    font: {
                        weight: 'bold',
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container my-2 border rounded mt-3 p-3 " >
            <div className="filter-options d-flex w-50 gap-4">
                <label className="cursor">
                    <input
                        type="radio"
                        value="day"
                        checked={status === "day"}
                        onChange={() => handleStatusChange("day")}
                    />
                    <span className="m-1 text-dark">Day</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value="month"
                        checked={status === "month"}
                        onChange={() => handleStatusChange("month")}
                    />
                    <span className="m-1 text-dark">Month</span>
                </label>
            </div>
            <Bar data={data} options={options} />

        </div>
    );
}
