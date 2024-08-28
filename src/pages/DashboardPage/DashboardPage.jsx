import React, { useState } from 'react';
import { Rating, IconButton, Button, Box, Typography } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import './DashboardPage.scss';

const categories = ['運動', '食事', '睡眠', '学習時間', '瞑想'];

const DashboardPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [ratings, setRatings] = useState(Array(categories.length).fill(0));

    // レーティング変更の処理
    const handleRatingChange = (index, value) => {
        const newRatings = [...ratings];
        newRatings[index] = value;
        setRatings(newRatings);
    };

    // リセットボタンの処理
    const handleReset = () => {
        setRatings(Array(categories.length).fill(0));
    };

    // レーダーチャートデータ
    const radarData = {
        labels: categories,
        datasets: [
            {
                label: '今日の頑張り',
                data: ratings,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            },
        ],
    };

    // レーダーチャートオプション
    const radarOptions = {
        scales: {
            r: {
                min: 0, // 最小値は常に0
                max: 5, // 最大値を5に固定
                ticks: {
                    stepSize: 1, // 1刻み
                    showLabelBackdrop: false, // 背景ラベルを無効化
                    color: '#666',
                },
                grid: {
                    color: '#ddd',
                },
                angleLines: {
                    color: '#ddd',
                },
                pointLabels: {
                    font: {
                        size: 14,
                    },
                    color: '#333',
                },
            },
        },
        maintainAspectRatio: false, // レーダーチャートを自由にサイズ調整可能に
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="dashboard-container">
                {/* 左側 - 日付、カテゴリー、星、ボタン */}
                <Box className="left-section">
                    <Box className="date-picker">
                        <Typography variant="h6">日付: {selectedDate ? selectedDate.format('YYYY-MM-DD') : '選択してください'}</Typography>
                        <DatePicker
                            value={selectedDate}
                            onChange={(newDate) => setSelectedDate(newDate)}
                            renderInput={(params) => (
                                <IconButton {...params}>
                                    <CalendarToday fontSize="large" />
                                </IconButton>
                            )}
                        />
                    </Box>

                    {/* カテゴリーとレーティング */}
                    {categories.map((category, index) => (
                        <Box key={index} className="category-rating">
                            <Typography variant="h6">{category}</Typography>
                            <Rating
                                name={`rating-${index}`}
                                value={ratings[index]}
                                onChange={(event, newValue) => handleRatingChange(index, newValue)}
                                size="large"
                                sx={{
                                    '& .MuiRating-iconEmpty': { color: '#9d9fa3' },
                                    '& .MuiRating-iconFilled': { color: '#fbc02d' },
                                }}
                            />
                        </Box>
                    ))}

                    {/* ボタン */}
                    <Box className="button-group">
                        <Button variant="contained" color="primary">決定</Button>
                        <Button variant="outlined" color="secondary" onClick={handleReset}>
                            リセット
                        </Button>
                    </Box>
                </Box>

                {/* 右側 - レーダーチャート */}
                <Box className="right-section">
                    <Radar data={radarData} options={radarOptions} />
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default DashboardPage;







// import React, { useState } from 'react';
// import { Rating, IconButton, Button, Box, Typography, TextField } from '@mui/material';
// import { CalendarToday } from '@mui/icons-material';
// import { Radar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import './DashboardPage.scss';

// const categories = ['運動時間', '食事', '睡眠', '学習時間', 'スキンケア'];

// const DashboardPage = () => {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [ratings, setRatings] = useState(Array(categories.length).fill(0));

//     const handleRatingChange = (index, value) => {
//         const newRatings = [...ratings];
//         newRatings[index] = value;
//         setRatings(newRatings);
//     };

//     const radarData = {
//         labels: categories,
//         datasets: [
//         {
//             label: '今日の頑張り',
//             data: ratings,
//             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1,
//         },
//         ],
//     };

//     return (
//         <Box className="dashboard-container">
//         {/* Left Side - Date, Categories, Stars, and Button */}
//         <Box className="left-section">
//             <Box className="date-picker">
//             <Typography variant="h6">日付: {selectedDate || '選択してください'}</Typography>
//             <IconButton onClick={() => alert('カレンダーが開く')}>
//                 <CalendarToday fontSize="large" />
//             </IconButton>
//             </Box>

//             {/* Categories and Ratings */}
//             {categories.map((category, index) => (
//             <Box key={index} className="category-rating">
//                 <Typography variant="h6">{category}</Typography>
//                 <Rating
//                 name={`rating-${index}`}
//                 value={ratings[index]}
//                 onChange={(event, newValue) => handleRatingChange(index, newValue)}
//                 size="large"
//                 sx={{
//                     '& .MuiRating-iconEmpty': { color: '#9d9fa3' },
//                     '& .MuiRating-iconFilled': { color: '#fbc02d' },
//                 }}
//                 />
//             </Box>
//             ))}

//             {/* Buttons */}
//             <Box className="button-group">
//             <Button variant="contained" color="primary">決定</Button>
//             <Button variant="outlined" color="secondary">リセット</Button>
//             </Box>
//         </Box>

//         {/* Right Side - Radar Chart */}
//         <Box className="right-section">
//             <Radar data={radarData} />
//         </Box>
//         </Box>
//     );
// };

// export default DashboardPage;



// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import { Radar } from "react-chartjs-2";
// import "react-datepicker/dist/react-datepicker.css";
// import "./DashboardPage.scss";

// // 必要な部分をchart.jsからインポートして登録
// import {
//     Chart as ChartJS,
//     RadialLinearScale,
//     PointElement,
//     LineElement,
//     Filler,
//     Tooltip,
//     Legend,
//     } from "chart.js";

//     // レーダーチャートで必要なコンポーネントを登録
//     ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

//     const categories = ["運動時間", "食事", "睡眠", "学習時間", "スキンケア"];

//     const DashboardPage = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [ratings, setRatings] = useState(Array(categories.length).fill(0));

//     const handleRatingChange = (index, value) => {
//         const newRatings = [...ratings];
//         newRatings[index] = value;
//         setRatings(newRatings);
//     };

//     const chartData = {
//         labels: categories,
//         datasets: [
//         {
//             label: "今日の評価",
//             data: ratings,
//             backgroundColor: "rgba(54, 162, 235, 0.2)",
//             borderColor: "rgba(54, 162, 235, 1)",
//             borderWidth: 2,
//         },
//         ],
//     };

//     const chartOptions = {
//         scale: {
//         ticks: { beginAtZero: true, max: 5, stepSize: 1 },
//         },
//     };

//     return (
//         <div className="dashboard">
//         <h1>Dashboard Page</h1>
//         <div className="dashboard__controls">
//             <div className="dashboard__date-picker">
//             <label>日付を選択:</label>
//             <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//             />
//             </div>
//             <div className="dashboard__ratings">
//             {categories.map((category, index) => (
//                 <div key={index} className="dashboard__rating">
//                 <h3>{category}</h3>
//                 {[1, 2, 3, 4, 5].map((star) => (
//                     <span
//                     key={star}
//                     className={`star ${ratings[index] >= star ? "selected" : ""}`}
//                     onClick={() => handleRatingChange(index, star)}
//                     >
//                     ★
//                     </span>
//                 ))}
//                 </div>
//             ))}
//             </div>
//         </div>
//         <button className="dashboard__submit-button">評価を確定</button>
//         <Radar data={chartData} options={chartOptions} className="dashboard__chart" />
//         </div>
//     );
// };

// export default DashboardPage;




// import React from "react";

// const DashboardPage = () => {
//     return (
//         <div>
//             <h1>Dashboard Page</h1>
//             <h3>運動時間</h3>
//             <h3>食事</h3>
//             <h3>睡眠</h3>
//             <h3>学習時間</h3>
//             <h3>スキンケア</h3>
//         </div>
//     )

// };

// export default DashboardPage;


            {/* 自分の一日の頑張りを可視化する。選択式で５つの項目を選ぶ。
            その５つの項目を自分で５段階評価を行う。
            今回はh3の５つの項目を例とする。
            まず、左側には日付機能がある。
            カレンダーボタンを押すと、カレンダー
            が出てきて、その日を押すと、日付が選べる。
            その横に、５つの項目が５段階評価出来る項目がある。
            その仕様としては、項目の横に星があり、自分で★を５段階
            の中から選んで、押す。
            ５つの項目を押して、決定ボタンを押すと、レーダーチャートが
            出来上がる。
            ５段階のレーダーチャートは、
            入力した情報を元に、そのグラフを埋めてくれる。

            レーダーチャートの上には、「日、週、月、年」を選べる部分があり、
            日付と今日の日付は対応している。週や月を選ぶと、平均のグラフが
            表示される。 */}