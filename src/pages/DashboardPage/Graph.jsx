import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box, MenuItem, Select, FormControl } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import "./Graph.scss";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const getLast7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString("en-US"));
    }
    return dates.reverse();
};

const Graph = () => {
    const last7Days = getLast7Days();
    const [selectedDate, setSelectedDate] = useState(last7Days[0]);
    const [caloriesData, setCaloriesData] = useState(new Array(7).fill(0));

    useEffect(() => {
        // Retrieve stored calories for each date
        const newCaloriesData = last7Days.map(date => {
            return parseFloat(localStorage.getItem(`calories_${date}`)) || 0;
        });
        setCaloriesData(newCaloriesData);
    }, []); // 空の依存配列に変更

    const data = {
        labels: last7Days,
        datasets: [
            {
                label: 'Calories',
                data: caloriesData,
                fill: false,
                backgroundColor: "#3e95cd",
                borderColor: "#3e95cd",
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 3500, // Adjust maximum value for better visualization
                stepSize: 500, // Define step size for y-axis
            },
        },
    };

    return (
        <Box className="graph-container" sx={{ height: '400px', paddingBottom: '30px' }}> {/* 高さを固定 */}
            <FormControl className="select-date">
                <Select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                >
                    {last7Days.map((date, index) => (
                        <MenuItem key={index} value={date}>
                            {date}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Line data={data} options={options} />
        </Box>
    );
};

export default Graph;






// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { Box, MenuItem, Select, FormControl } from "@mui/material";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';
// import "./Graph.scss";

// // Register ChartJS components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

// // Generate the last 7 days in MM/DD/YYYY format
// const getLast7Days = () => {
//     const dates = [];
//     for (let i = 0; i < 7; i++) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         dates.push(date.toLocaleDateString("en-US")); // MM/DD/YYYY format
//     }
//     return dates.reverse(); // optional: to display from the earliest to the latest date
// };

// const Graph = () => {
//     const [selectedDate, setSelectedDate] = useState(getLast7Days()[0]);
//     const [caloriesData, setCaloriesData] = useState(new Array(7).fill(0));
//     const last7Days = getLast7Days();

//     useEffect(() => {
//         const storedCheckedMeals = JSON.parse(localStorage.getItem("checkedMeals")) || {};
//         const meals = Object.keys(storedCheckedMeals).map(key => JSON.parse(localStorage.getItem(`meal_${key}`)));
//         const totalCalories = meals.reduce((sum, meal) => sum + (meal?.calories || 0), 0);
//         const newCaloriesData = [...caloriesData];
//         const dateIndex = last7Days.indexOf(selectedDate);
//         if (dateIndex !== -1) {
//             newCaloriesData[dateIndex] = totalCalories;
//         }
//         setCaloriesData(newCaloriesData);
//     }, [selectedDate]);

//     const data = {
//         labels: last7Days,
//         datasets: [
//             {
//                 label: 'Calories',
//                 data: caloriesData,
//                 fill: false,
//                 backgroundColor: "#3e95cd",
//                 borderColor: "#3e95cd",
//                 tension: 0.1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     return (
//         <Box className="graph-container">
//             <FormControl className="select-date">
//                 <Select
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                 >
//                     {last7Days.map((date, index) => (
//                         <MenuItem key={index} value={date}>
//                             {date}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>

//             <Line data={data} options={options} />
//         </Box>
//     );
// };

// export default Graph;




// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';
// import "./Graph.scss";

// // Register ChartJS components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const Graph = () => {
//     const [selectedDay, setSelectedDay] = useState(new Date().getDay());
//     const [caloriesData, setCaloriesData] = useState(new Array(7).fill(0));

//     useEffect(() => {
//         const storedCheckedMeals = JSON.parse(localStorage.getItem("checkedMeals")) || {};
//         const meals = Object.keys(storedCheckedMeals).map(key => JSON.parse(localStorage.getItem(`meal_${key}`)));
//         const totalCalories = meals.reduce((sum, meal) => sum + (meal?.calories || 0), 0);
//         const newCaloriesData = [...caloriesData];
//         newCaloriesData[selectedDay] = totalCalories;
//         setCaloriesData(newCaloriesData);
//     }, [selectedDay]);

//     const data = {
//         labels: daysOfWeek,
//         datasets: [
//             {
//                 label: 'Calories',
//                 data: caloriesData,
//                 fill: false,
//                 backgroundColor: "#3e95cd",
//                 borderColor: "#3e95cd",
//                 tension: 0.1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     return (
//         <Box className="graph-container">
//             <FormControl className="select-day">
//                 <InputLabel>Day</InputLabel>
//                 <Select
//                     value={selectedDay}
//                     onChange={(e) => setSelectedDay(e.target.value)}
//                     label="Day"
//                 >
//                     {daysOfWeek.map((day, index) => (
//                         <MenuItem key={index} value={index}>
//                             {day}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>

//             <Line data={data} options={options} />
//         </Box>
//     );
// };

// export default Graph;


// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
// import "./Graph.scss";

// const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const Graph = () => {
//     const [selectedDay, setSelectedDay] = useState(new Date().getDay());
//     const [caloriesData, setCaloriesData] = useState(new Array(7).fill(0));

//     useEffect(() => {
//         const storedCheckedMeals = JSON.parse(localStorage.getItem("checkedMeals")) || {};
//         const meals = Object.keys(storedCheckedMeals).map(key => JSON.parse(localStorage.getItem(`meal_${key}`)));
//         const totalCalories = meals.reduce((sum, meal) => sum + (meal?.calories || 0), 0);
//         const newCaloriesData = [...caloriesData];
//         newCaloriesData[selectedDay] = totalCalories;
//         setCaloriesData(newCaloriesData);
//     }, [selectedDay]);

//     const data = {
//         labels: daysOfWeek,
//         datasets: [
//             {
//                 data: caloriesData,
//                 fill: false,
//                 backgroundColor: "#3e95cd",
//                 borderColor: "#3e95cd",
//                 tension: 0.1,
//             },
//         ],
//     };

//     const options = {
//         plugins: {
//             legend: {
//                 display: false, // ラベルを非表示にする
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//         maintainAspectRatio: false,
//     };

//     return (
//         <Box className="graph-container">
//             <FormControl className="select-day">
//                 <InputLabel>Day</InputLabel>
//                 <Select
//                     value={selectedDay}
//                     onChange={(e) => setSelectedDay(e.target.value)}
//                     label="Day"
//                 >
//                     {daysOfWeek.map((day, index) => (
//                         <MenuItem key={index} value={index}>
//                             {day}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>

//             <Line data={data} options={options} />
//         </Box>
//     );
// };

// export default Graph;


// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { Box, MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";
// import "./Graph.scss";

// const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// const Graph = () => {
//     const [selectedDay, setSelectedDay] = useState(new Date().getDay());
//     const [caloriesData, setCaloriesData] = useState(new Array(7).fill(0)); // 一週間分のカロリーを格納

//     useEffect(() => {
//         // ローカルストレージからcheckedMealsを取得
//         const storedCheckedMeals = JSON.parse(localStorage.getItem("checkedMeals")) || {};

//         // カロリー合計を計算
//         const meals = Object.keys(storedCheckedMeals).map(key => JSON.parse(localStorage.getItem(`meal_${key}`)));
//         const totalCalories = meals.reduce((sum, meal) => sum + (meal?.calories || 0), 0);

//         // カロリーデータを更新
//         const newCaloriesData = [...caloriesData];
//         newCaloriesData[selectedDay] = totalCalories;
//         setCaloriesData(newCaloriesData);
//     }, [selectedDay]);

//     const data = {
//         labels: daysOfWeek,
//         datasets: [
//             {
//                 label: "Calories",
//                 data: caloriesData,
//                 fill: false,
//                 backgroundColor: "#3e95cd",
//                 borderColor: "#3e95cd",
//                 tension: 0.1,
//             },
//         ],
//     };

//     return (
//         <Box className="graph-container">
//             <FormControl className="select-day">
//                 <InputLabel>Day</InputLabel>
//                 <Select
//                     value={selectedDay}
//                     onChange={(e) => setSelectedDay(e.target.value)}
//                     label="Day"
//                 >
//                     {daysOfWeek.map((day, index) => (
//                         <MenuItem key={index} value={index}>
//                             {day}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>

//             <Typography variant="h5" align="center" gutterBottom>
//                 Weekly Calorie Intake
//             </Typography>

//             <Line data={data} options={{ maintainAspectRatio: false }} />
//         </Box>
//     );
// };

// export default Graph;


