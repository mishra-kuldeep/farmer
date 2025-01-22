
// "use client";
// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from "chart.js";
// import AdminDashboardServices from "@/services/AdminDashboardServices";

// // Register the required Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const OrderRevenueBarChart = ({ dateRange }) => {
//     const [dataSet, setDataSet] = useState([]);

//     const apiCall = () => {
//         AdminDashboardServices.getDateWiseOrderPayment(dateRange)
//             .then(({ data }) => {
//                 console.log(data)
//                 setDataSet(data);
//             })
//             .catch((error) => {
//                 console.error("Failed to fetch data:", error);
//             });
//     };

//     useEffect(() => {
//         if (dateRange?.fromDate && dateRange?.toDate) {
//             apiCall()
//         }
//     }, [dateRange]);

//     const labelData = dataSet?.map((item) => item.orderDate);
//     const OrderPytData = dataSet?.map((item) => item.totalAmount);


//     const data = {
//         labels: labelData,
//         datasets: [
//             {
//                 label: "Order Payments",
//                 data: OrderPytData,
//                 backgroundColor: '#476f00',
//                 borderColor: "#476f00",
//                 borderWidth: 1,
//             },
//         ],

//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: { position: "top" },
//             title: {
//                 display: true,
//                 text: `Date wise order Revenue`,
//             },
//         },
//         scales: {
//             x: {
//                 type: 'category',
//                 stacked: true,
//                 grid: {
//                     display: false,
//                 },
//                 ticks: {
//                     color: 'grey',
//                     font: {
//                         weight: 'bold',
//                     },
//                 },
//             },
//             y: {
//                 type: 'linear',
//                 stacked: true,
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.1)',
//                 },
//                 ticks: {
//                     color: 'grey',
//                     font: {
//                         weight: 'bold',
//                     },
//                 },
//             },
//         },
//     };

//     return (
//         <div className="chart-container my-2 border rounded mt-3 p-3 " >
//             <Bar data={data} options={options} />
//         </div>
//     );
// }
// export default OrderRevenueBarChart

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
} from "chart.js";
import AdminDashboardServices from "@/services/AdminDashboardServices";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderRevenueBarChart = ({ dateRange }) => {
    const [dataSet, setDataSet] = useState([]);
    const [labels, setLabels] = useState([]);

    // Helper to generate date range labels
    const generateDateRange = (startDate, endDate) => {
        const dateLabels = [];
        let currentDate = new Date(startDate);
        const finalDate = new Date(endDate);

        while (currentDate <= finalDate) {
            dateLabels.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateLabels;
    };

    const apiCall = () => {
        AdminDashboardServices.getDateWiseOrderPayment(dateRange)
            .then(({ data }) => {
                const generatedLabels = generateDateRange(
                    dateRange.fromDate,
                    dateRange.toDate
                );
                setLabels(generatedLabels);

                // Map dataset to labels and fill missing dates with zero
                const mappedData = generatedLabels.map((date) => {
                    const match = data.find((item) => item.orderDate === date);
                    return {
                        orderDate: date,
                        totalAmount: match ? match.totalAmount : 0,
                    };
                });

                setDataSet(mappedData);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
            });
    };

    useEffect(() => {
        if (dateRange?.fromDate && dateRange?.toDate) {
            apiCall();
        }
    }, [dateRange]);

    const labelData = dataSet.map((item) => item.orderDate);
    const OrderPytData = dataSet.map((item) => item.totalAmount);

    const data = {
        labels: labelData,
        datasets: [
            {
                label: "Order Payments",
                data: OrderPytData,
                backgroundColor: "#476f00",
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
                text: `Date wise order Revenue`,
            },
        },
        scales: {
            y: { beginAtZero: true },
        }
    };

    return (
        <div className="chart-container my-2 border rounded mt-3 p-3">
            <Bar data={data} options={options} />
        </div>
    );
};

export default OrderRevenueBarChart;

