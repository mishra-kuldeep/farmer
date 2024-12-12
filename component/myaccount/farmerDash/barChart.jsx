// "use client"
// import { useEffect, useState } from "react"
// import ReportsServices from "@/services/ReportsServices";
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register the required Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// export default function Userdesh() {
//   const [dataSet, setDataSet] = useState([])
//   const [status, setStatus] = useState('day')
//   const [startDate, setstartDate] = useState('')
//   const [endDate, setendDate] = useState('')

//   const handleStatusChange = (value) => {
//     setStatus(value);

//     if (value === 'day') {
//       // Current date as a Date object
//       const currentDate = new Date();
//       // Add 30 days to the current date
//       const futureDate = new Date();
//       futureDate.setDate(currentDate.getDate() - 30);

//       // Set the start and end dates as ISO strings
//       setstartDate(futureDate.toISOString().split('T')[0]);
//       setendDate(currentDate.toISOString().split('T')[0]);
//     } else {
//       // Current date as a Date object
//       const currentDate = new Date();
//       // Add 12 months to the current date
//       const futureDate = new Date();
//       futureDate.setMonth(currentDate.getMonth() - 12);

//       // Set the start and end dates as ISO strings
//       setstartDate(futureDate.toISOString().split('T')[0]);
//       setendDate(currentDate.toISOString().split('T')[0]);
//     }
//   };


//   const apiCall = () => {
//     const filter = {
//       startDate,
//       endDate,
//       duration: status
//     }
//     console.log(filter)
//     ReportsServices.farmerRevenue(filter).then(({ data }) => {
//       console.log(data)
//       setDataSet(data.data)
//     }).catch((e) => {
//       console.log(e)

//     })
//   }
//   useEffect(() => {
//     apiCall()
//   }, [status]);

//   const data = {
//     labels: dataSet?.map(item => item?.date || item?.month),
//     datasets: [
//       {
//         label: 'My First Dataset',
//         data: dataSet?.map(item => item?.Revenue),
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 205, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(201, 203, 207, 0.2)',
//         ],
//         borderColor: [
//           'rgb(255, 99, 132)',
//           'rgb(255, 159, 64)',
//           'rgb(255, 205, 86)',
//           'rgb(75, 192, 192)',
//           'rgb(54, 162, 235)',
//           'rgb(153, 102, 255)',
//           'rgb(201, 203, 207)',
//         ],
//         borderWidth: 2,
//       },
//     ],
//   };

//   // Chart configuration
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Bar Chart Example',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ height: '400px' }}> 
//       <div className="d-flex">
//         <div className="w-50 gap-4 d-flex m-2">
//           <label className="cursor">
//             <input
//               type="radio"
//               value="day"
//               checked={status == "day"}
//               onChange={() => handleStatusChange("day")}
//             />
//             <span className="m-1">Day</span>
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="year"
//               checked={status == "year"}
//               onChange={() => handleStatusChange("year")}
//             />
//             <span className="m-1">Year</span>
//           </label>
//         </div>
//       </div>
//       <Bar data={data} options={options} />
//     </div>
//   )
// }


"use client";
import { useEffect, useState } from "react";
import ReportsServices from "@/services/ReportsServices";
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
    <div className="chart-container" style={{ height: "400px" }}>
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
          <span className="m-1">Year</span>
        </label>
      </div>
      <Bar data={data} options={options} />

    </div>
  );
}
