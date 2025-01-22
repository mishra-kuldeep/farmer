
"use client";
import { useEffect, useState } from "react";
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
import AdminDashboardServices from "@/services/AdminDashboardServices";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderBarchart = ({ dateRange }) => {
    const [dataSet, setDataSet] = useState([]);

    const apiCall = () => {
        AdminDashboardServices.getDateWiseOrder(dateRange)
            .then(({ data }) => {
                console.log(data)
                setDataSet(data);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });
    };

    useEffect(() => {
        if (dateRange?.fromDate && dateRange?.toDate) {
            apiCall()
        }
    }, [dateRange]);


    const labeldata = dataSet?.map((item) => item.orderDate);
    const OrderData = dataSet?.map((item) => item.totalOrders);
    const data = {
        labels: labeldata,
        datasets: [
            {
                label: "Order Placed",
                data: OrderData,
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
                text: `Date wise total order`,
            },
        },
        scales: {
            y: { beginAtZero: true },
        }
       
    };

    return (
        <div className="chart-container my-2 border rounded mt-3 p-3 " >
            <Bar data={data} options={options} />
        </div>
    );
}
export default OrderBarchart
