import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FoodTable from "./FoodTable";
import MealArticul from "../BodyIndexPage/MealArticul"; // MealArticulをインポート
import './CaloriePage.scss'; // SCSSファイルをインポート
import { useSelector } from "react-redux";
import { selectBmr } from "../../features/bmr/bmrSlice"; // BMRのセレクタをインポート

const options = [
    { value: "grain", label: "穀類" },
    { value: "meat", label: "肉類・卵" },
    { value: "fish", label: "魚介類" },
    { value: "vegetable", label: "野菜" },
    { value: "fruit", label: "果物" },
    { value: "oil", label: "油脂類" },
    // 他のオプション
];

const CaloriePage = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const bmr = useSelector(selectBmr); // BMRの値を取得
    const [meals, setMeals] = useState([]);

    // ローカルストレージから献立を取得
    useEffect(() => {
        const mealIds = Object.keys(localStorage).filter(key => key.startsWith("meal_"));
        const storedMeals = mealIds.map(id => JSON.parse(localStorage.getItem(id)));
        setMeals(storedMeals);
    }, []);

    const handleClick = (option) => {
        setSelectedOption(prevOption => (prevOption === option ? "" : option));
    };

    return (
        <>
            <Typography variant="h2" align="center" gutterBottom className="main-title">
                栄養価一覧
            </Typography>

            <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
                {options.map((option, index) => (
                    <Grid item xs={12} sm={4} md={3} key={index}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => handleClick(option.value)}
                            sx={{
                                backgroundColor: "#34675c",
                                color: "#ffffff",
                                borderRadius: "10px",
                                padding: "15px 20px",
                                display: "flex",
                                justifyContent: "space-between",
                                "&:hover": {
                                    backgroundColor: "#86ac41",
                                },
                            }}
                        >
                            {option.label}
                            <ArrowForwardIosIcon sx={{ marginLeft: 1 }} />
                        </Button>
                    </Grid>
                ))}
            </Grid>

            {/* 選択されたオプションに応じてテーブルを表示 */}
            {selectedOption && <FoodTable category={selectedOption} />}
            
            <Typography variant="body2" className="annotation">
                日本食品標準成分表(七訂)準拠  可食部100gあたりの成分値
            </Typography>

            {/* 必須カロリーの表示 */}
            <Box className="bmr-container">
                <Typography variant="h6" className="bmr-title">
                    あなたの必須カロリー：
                </Typography>
                <Typography variant="h4" className="bmr-value">
                    {Math.round(bmr)} kcal
                </Typography>
            </Box>

            {/* あなたが調べた献立の表示 */}
            <Box className="meal-history-container">
                <Typography variant="h5" className="meal-history-title">
                    あなたが調べた献立：
                </Typography>
                {meals.length > 0 ? (
                    meals.map((meal, index) => (
                        <MealArticul key={index} meal={meal} />
                    ))
                ) : (
                    <Typography variant="body1">
                        まだ献立がありません。
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default CaloriePage;



// import React, { useState } from "react";
// import { Button, Grid, Typography, Box } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import FoodTable from "./FoodTable";
// import "./CaloriePage.scss"; // SCSSファイルをインポート
// import { useSelector } from "react-redux";
// import { selectBmr } from "../../features/bmr/bmrSlice"; // BMRのセレクタをインポート
// import MealArticul from "../BodyIndexPage/MealArticul"; // MealArticulコンポーネントをインポート

// const options = [
//     { value: "grain", label: "穀類" },
//     { value: "meat", label: "肉類・卵" },
//     { value: "fish", label: "魚介類" },
//     { value: "vegetable", label: "野菜" },
//     { value: "fruit", label: "果物" },
//     { value: "oil", label: "油脂類" },
//     // 他のオプション
// ];

// const CaloriePage = () => {
//     const [selectedOption, setSelectedOption] = useState("");
//     const bmr = useSelector(selectBmr); // BMRの値を取得
//     const mealIds = ["1697577", "650378", "716432"]; // ローカルストレージに保存された献立IDの例

//     const handleClick = (option) => {
//         setSelectedOption((prevOption) => (prevOption === option ? "" : option));
//     };

//     const getMealFromLocalStorage = (mealId) => {
//         const cachedMeal = localStorage.getItem(`meal_${mealId}`);
//         const parsedMeal = cachedMeal ? JSON.parse(cachedMeal) : null;

//         // ログで確認
//         console.log(`Meal ID: ${mealId}`, parsedMeal);

//         return parsedMeal;
//     };

//     return (
//         <>
//             <Typography variant="h2" align="center" gutterBottom className="main-title">
//                 栄養価一覧
//             </Typography>

//             <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
//                 {options.map((option, index) => (
//                     <Grid item xs={12} sm={4} md={3} key={index}>
//                         <Button
//                             fullWidth
//                             variant="contained"
//                             onClick={() => handleClick(option.value)}
//                             sx={{
//                                 backgroundColor: "#34675c",
//                                 color: "#ffffff",
//                                 borderRadius: "10px",
//                                 padding: "15px 20px",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 "&:hover": {
//                                     backgroundColor: "#86ac41",
//                                 },
//                             }}
//                         >
//                             {option.label}
//                             <ArrowForwardIosIcon sx={{ marginLeft: 1 }} />
//                         </Button>
//                     </Grid>
//                 ))}
//             </Grid>

//             {/* 選択されたオプションに応じてテーブルを表示 */}
//             {selectedOption && <FoodTable category={selectedOption} />}

//             <Typography variant="body2" className="annotation">
//                 日本食品標準成分表(七訂)準拠 可食部100gあたりの成分値
//             </Typography>

//             {/* 必須カロリーの表示 */}
//             <Box className="bmr-container">
//                 <Typography variant="h6" className="bmr-title">
//                     あなたの必須カロリー：
//                 </Typography>
//                 <Typography variant="h4" className="bmr-value">
//                     {Math.round(bmr)} kcal
//                 </Typography>
//             </Box>

//             {/* あなたが調べた献立 */}
//             <Box className="meal-history-container">
//                 <Typography variant="h4" className="meal-history-title">
//                     あなたが調べた献立
//                 </Typography>
//                 {mealIds.map((mealId) => {
//                     const meal = getMealFromLocalStorage(mealId);
//                     return meal ? <MealArticul key={mealId} meal={meal} /> : null;
//                 })}
//             </Box>
//         </>
//     );
// };

// export default CaloriePage;



// import React, { useState } from "react";
// import { Button, Grid, Typography, Box } from "@mui/material";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import FoodTable from "./FoodTable";
// import "./CaloriePage.scss"; // SCSSファイルをインポート
// import { useSelector } from "react-redux";
// import { selectBmr } from "../../features/bmr/bmrSlice"; // BMRのセレクタをインポート
// import MealArticul from "../BodyIndexPage/MealArticul"; // MealArticulコンポーネントをインポート

// const options = [
//     { value: "grain", label: "穀類" },
//     { value: "meat", label: "肉類・卵" },
//     { value: "fish", label: "魚介類" },
//     { value: "vegetable", label: "野菜" },
//     { value: "fruit", label: "果物" },
//     { value: "oil", label: "油脂類" },
//     // 他のオプション
//     ];

//     const CaloriePage = () => {
//     const [selectedOption, setSelectedOption] = useState("");
//     const bmr = useSelector(selectBmr); // BMRの値を取得
//     const mealIds = ["1697577", "649405", "653019"]; // ローカルストレージに保存された献立IDの例

//     const handleClick = (option) => {
//         setSelectedOption((prevOption) => (prevOption === option ? "" : option));
//     };

//     const getMealFromLocalStorage = (mealId) => {
//         const cachedMeal = localStorage.getItem(`meal_${mealId}`);
//         return cachedMeal ? JSON.parse(cachedMeal) : null;
//     };

//     return (
//         <>
//         <Typography variant="h2" align="center" gutterBottom className="main-title">
//             栄養価一覧
//         </Typography>

//         <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
//             {options.map((option, index) => (
//             <Grid item xs={12} sm={4} md={3} key={index}>
//                 <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={() => handleClick(option.value)}
//                 sx={{
//                     backgroundColor: "#34675c",
//                     color: "#ffffff",
//                     borderRadius: "10px",
//                     padding: "15px 20px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     "&:hover": {
//                     backgroundColor: "#86ac41",
//                     },
//                 }}
//                 >
//                 {option.label}
//                 <ArrowForwardIosIcon sx={{ marginLeft: 1 }} />
//                 </Button>
//             </Grid>
//             ))}
//         </Grid>

//         {/* 選択されたオプションに応じてテーブルを表示 */}
//         {selectedOption && <FoodTable category={selectedOption} />}

//         <Typography variant="body2" className="annotation">
//             日本食品標準成分表(七訂)準拠 可食部100gあたりの成分値
//         </Typography>

//         {/* 必須カロリーの表示 */}
//         <Box className="bmr-container">
//             <Typography variant="h6" className="bmr-title">
//             あなたの必須カロリー：
//             </Typography>
//             <Typography variant="h4" className="bmr-value">
//             {Math.round(bmr)} kcal
//             </Typography>
//         </Box>

//         {/* あなたが調べた献立 */}
//         <Box className="meal-history-container">
//             <Typography variant="h4" className="meal-history-title">
//             あなたが調べた献立
//             </Typography>
//             {mealIds.map((mealId) => {
//             const meal = getMealFromLocalStorage(mealId);
//             return meal ? <MealArticul key={mealId} meal={meal} /> : null;
//             })}
//         </Box>
//         </>
//     );
// };

// export default CaloriePage;





// import React, { useState } from "react";
// import { Button, Grid, Typography, Box } from "@mui/material";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import FoodTable from "./FoodTable";
// import './CaloriePage.scss'; // SCSSファイルをインポート
// import { useSelector } from "react-redux";
// import { selectBmr } from "../../features/bmr/bmrSlice"; // BMRのセレクタをインポート

// const options = [
//     { value: "grain", label: "穀類" },
//     { value: "meat", label: "肉類・卵" },
//     { value: "fish", label: "魚介類" },
//     { value: "vegetable", label: "野菜" },
//     { value: "fruit", label: "果物" },
//     { value: "oil", label: "油脂類" },
//     // 他のオプション
// ];

// const CaloriePage = () => {
//     const [selectedOption, setSelectedOption] = useState("");
//     const bmr = useSelector(selectBmr); // BMRの値を取得

//     const handleClick = (option) => {
//         setSelectedOption(prevOption => (prevOption === option ? "" : option));
//     };

//     return (
//         <>
//             <Typography variant="h2" align="center" gutterBottom className="main-title">
//                 栄養価一覧
//             </Typography>

//             <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
//                 {options.map((option, index) => (
//                     <Grid item xs={12} sm={4} md={3} key={index}>
//                         <Button
//                             fullWidth
//                             variant="contained"
//                             onClick={() => handleClick(option.value)}
//                             sx={{
//                                 backgroundColor: "#34675c",
//                                 color: "#ffffff",
//                                 borderRadius: "10px",
//                                 padding: "15px 20px",
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 "&:hover": {
//                                     backgroundColor: "#86ac41",
//                                 },
//                             }}
//                         >
//                             {option.label}
//                             <ArrowForwardIosIcon sx={{ marginLeft: 1 }} />
//                         </Button>
//                     </Grid>
//                 ))}
//             </Grid>

//             {/* 選択されたオプションに応じてテーブルを表示 */}
//             {selectedOption && <FoodTable category={selectedOption} />}
            
//             <Typography variant="body2" className="annotation">
//                 日本食品標準成分表(七訂)準拠  可食部100gあたりの成分値
//             </Typography>

//             {/* 必須カロリーの表示 */}
//             <Box className="bmr-container">
//                 <Typography variant="h6" className="bmr-title">
//                     あなたの必須カロリー：
//                 </Typography>
//                 <Typography variant="h4" className="bmr-value">
//                     {Math.round(bmr)} kcal
//                 </Typography>
//             </Box>
//         </>
//     );
// };

// export default CaloriePage;




// import React from "react";
// import { useSelector } from "react-redux";
// import { Button, Grid, Typography } from "@mui/material";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import FoodTable from "./FoodTable";
// import './CaloriePage.scss'; // SCSSファイルをインポート
// import { selectBmr } from "../../features/bmr/bmrSlice"; // bmrSliceからbmrを取得するセレクタをインポート

// const options = [
//     { value: "grain", label: "穀類" },
//     { value: "meat", label: "肉類・卵" },
//     { value: "fish", label: "魚介類" },
//     { value: "vegetable", label: "野菜" },
//     { value: "fruit", label: "果物" },
//     { value: "oil", label: "油脂類" },
//     // 他のオプション
// ];

// const CaloriePage = () => {
//     const [selectedOption, setSelectedOption] = React.useState("");
    
//     // Reduxストアからbmrを取得
//     const bmr = useSelector(selectBmr);

//     const handleClick = (option) => {
//         setSelectedOption(prevOption => (prevOption === option ? "" : option));
//     };

//     return (
//         <>
//         <Typography variant="h2" align="center" gutterBottom className="main-title">
//             栄養価一覧
//         </Typography>

//         {/* bmrの値を表示 */}
//         <Typography variant="h6" align="center" gutterBottom className="bmr-display">
//             あなたの必須カロリー: {bmr ? `${Math.round(bmr)} kcal` : "計算してください"}
//         </Typography>

//         <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
//             {options.map((option, index) => (
//             <Grid item xs={12} sm={4} md={3} key={index}>
//                 <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={() => handleClick(option.value)}
//                 sx={{
//                     backgroundColor: "#34675c",
//                     color: "#ffffff",
//                     borderRadius: "10px",
//                     padding: "15px 20px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     "&:hover": {
//                     backgroundColor: "#86ac41",
//                     },
//                 }}
//                 >
//                 {option.label}
//                 <ArrowForwardIosIcon sx={{ marginLeft: 1 }} />
//                 </Button>
//             </Grid>
//             ))}
//         </Grid>

//         {/* 選択されたオプションに応じてテーブルを表示 */}
//         {selectedOption && <FoodTable category={selectedOption} />}
        
//         <Typography variant="body2" className="annotation">
//             日本食品標準成分表(七訂)準拠  可食部100gあたりの成分値
//         </Typography>
//         </>
//     );
// };

// export default CaloriePage;




// import React, { useState } from "react";
// import { Button, Grid, Typography } from "@mui/material";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import FoodTable from "./FoodTable";
// import './CaloriePage.scss'; // SCSSファイルをインポート

// const options = [
//     { value: "grain", label: "穀類" },
//     { value: "meat", label: "肉類・卵" },
//     { value: "fish", label: "魚介類" },
//     { value: "vegetable", label: "野菜" },
//     { value: "fruit", label: "果物" },
//     { value: "oil", label: "油脂類" },
//     // 他のオプション
// ];

// const CaloriePage = () => {
//     const [selectedOption, setSelectedOption] = useState("");

//     const handleClick = (option) => {
//         setSelectedOption(prevOption => (prevOption === option ? "" : option));
//     };

//     return (
//         <>
//         <Typography variant="h2" align="center" gutterBottom className="main-title">
//             栄養価一覧
//         </Typography>

//         <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
//             {options.map((option, index) => (
//             <Grid item xs={12} sm={4} md={3} key={index}>
//                 <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={() => handleClick(option.value)}
//                 sx={{
//                     backgroundColor: "#34675c",
//                     color: "#ffffff",
//                     borderRadius: "10px",
//                     padding: "15px 20px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     "&:hover": {
//                     backgroundColor: "#86ac41",
//                     },
//                 }}
//                 >
//                 {option.label}
//                 <ArrowForwardIosIcon sx={{ marginLeft: 1 }} />
//                 </Button>
//             </Grid>
//             ))}
//         </Grid>

//         {/* 選択されたオプションに応じてテーブルを表示 */}
//         {selectedOption && <FoodTable category={selectedOption} />}
        
//         <Typography variant="body2" className="annotation">
//             日本食品標準成分表(七訂)準拠  可食部100gあたりの成分値
//         </Typography>
//         </>
//     );
// };

// export default CaloriePage;




// import React, { useState } from "react";
// import { Button, Grid, Typography } from "@mui/material";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import FoodTable from "./FoodTable";

// const options = [
//     { value: "grain", label: "穀類" },
//     { value: "meat", label: "肉類・卵" },
//     { value: "fish", label: "魚介類" },
//     { value: "vegetable", label: "野菜" },
//     { value: "fruit", label: "果物" },
//     { value: "oil", label: "油脂類" },
//     // 他のオプション
// ];

// const CaloriePage = () => {
//     const [selectedOption, setSelectedOption] = useState("");

//     const handleClick = (option) => {
//         setSelectedOption(option);
//     };

//     return (
//         <>
//         <Typography variant="h2" align="center" gutterBottom>栄養価一覧</Typography>
//         {/* <Typography variant="h3" align="center" gutterBottom>気になる成分をチェック！</Typography> */}

//         <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
//             {options.map((option, index) => (
//             <Grid item xs={12} sm={4} md={3} key={index}>
//                 <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={() => handleClick(option.value)}
//                 sx={{
//                     backgroundColor: "#34675c",
//                     color: "#ffffff",
//                     borderRadius: "10px",
//                     padding: "15px 20px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     "&:hover": {
//                     backgroundColor: "#86ac41",
//                     },
//                 }}
//                 >
//                 {option.label}
//                 <ArrowForwardIosIcon sx={{ marginLeft: 1 }} />
//                 </Button>
//             </Grid>
//             ))}
//         </Grid>

//         {/* 選択されたオプションに応じてテーブルを表示 */}
//         {selectedOption && <FoodTable category={selectedOption} />}
//         <h3>日本食品標準成分表(七訂)準拠  可食部100gあたりの成分値</h3>
//         </>
//     );
// };

// export default CaloriePage;




// import React, { useState } from "react";
// import { Button, Grid, Typography } from "@mui/material";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import MeatTable from "./MeatTable";

// const options = [
//     { value: "grain", label: "穀類" },
//     { value: "meat", label: "肉類・卵" },
//     { value: "fish", label: "魚介類" },
//     { value: "vegetable", label: "野菜類" },
//     { value: "flutes", label: "果実類" },
//     { value: "seeds", label: "種子類" },
//     { value: "potato", label: "芋類" },
//     { value: "oil", label: "油脂類" },
//     ];

//     const CaloriePage = () => {
//     const [selectedOption, setSelectedOption] = useState("");

//     const handleClick = (option) => {
//         setSelectedOption(option);
//     };

//     return (
//         <>
//         <Typography variant="h2" align="center" gutterBottom>栄養価一覧</Typography>
//         <Typography variant="h3" align="center" gutterBottom>オプションを選択</Typography>

//         <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
//             {options.map((option, index) => (
//             <Grid item xs={12} sm={4} md={3} key={index}>
//                 <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={() => handleClick(option.value)}
//                 sx={{
//                     //シック系
//                     //backgroundColor: "#6d93aa",

//                     //自然
//                     backgroundColor: "#34675c",


//                     //color: "#4c3314",

//                     //シック系
//                     //color: "#cad3da",

//                     //自然
//                     color: "#fffff",


//                     borderRadius: "10px",
//                     padding: "15px 20px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     "&:hover": {
//                     backgroundColor: "#86ac41",
//                     },
//                 }}
//                 >
//                 {option.label}
//                 <ArrowForwardIosIcon sx={{ marginLeft: 1 }} />
//                 </Button>
//             </Grid>
//             ))}
//         </Grid>

//         {/* 選択されたオプションに応じてテーブルを表示 */}
//         {selectedOption === "meat" && <MeatTable />}
//         {selectedOption !== "meat" && selectedOption && (
//             <Typography align="center" sx={{ marginTop: 4 }}>選択したカテゴリのデータはまだ準備中です。</Typography>
//         )}
//         </>
//     );
// };

// export default CaloriePage;



// import React, { useState } from "react";
// import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
// import MeatTable from "./MeatTable";

// const CaloriePage = () => {
//     const [selectedOption, setSelectedOption] = useState("");

//     const handleChange = (event) => {
//         setSelectedOption(event.target.value);
//     };

//     return (
//         <>
//         <h2>栄養価一覧</h2>
//         <h3>オプションを選択</h3>
//         <FormControl variant="outlined" sx={{ minWidth: 120 }}>
//             <InputLabel>栄養価</InputLabel>
//             <Select
//             label="栄養価"
//             value={selectedOption}
//             onChange={handleChange}
//             sx={{
//                 borderRadius: "25px",
//                 "& .Mui-selected": { color: "green" },
//             }}
//             >
//             <MenuItem value="grain">穀類</MenuItem>
//             <MenuItem value="meat">肉類・卵</MenuItem>
//             <MenuItem value="fish">魚介類</MenuItem>
//             <MenuItem value="vegetable">野菜類</MenuItem>
//             <MenuItem value="flutes">果実類</MenuItem>
//             <MenuItem value="seeds">種子類</MenuItem>
//             <MenuItem value="potato">芋類</MenuItem>
//             <MenuItem value="oil">油脂類</MenuItem>
//             </Select>
//         </FormControl>

//         {/* 選択されたオプションに応じてテーブルを表示 */}
//         {selectedOption === "meat" && <MeatTable />}
//         {selectedOption !== "meat" && selectedOption && <p>選択したカテゴリのデータはまだ準備中です。</p>}
//         </>
//     );
// };

// export default CaloriePage;




// import React, { useState } from 'react';
// import { Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const MEAT_DATA = [
//     { type: '牛肉 (もも肉) ※和牛', calories: '259kcal', protein: '19.2g', potassium: '320mg', phosphorus: '160mg', salt: '0.1g' },
//     { type: '牛肉 (ばら肉) ※和牛', calories: '517kcal', protein: '11.0g', potassium: '160mg', phosphorus: '87mg', salt: '0.1g' },
//     { type: '豚肉 (ロース)', calories: '263kcal', protein: '19.3g', potassium: '310mg', phosphorus: '180mg', salt: '0.1g' },
//     { type: '豚肉 (ばら肉)', calories: '395kcal', protein: '14.4g', potassium: '240mg', phosphorus: '130mg', salt: '0.1g' },
//     { type: '豚肉 (もも肉)', calories: '183kcal', protein: '20.5g', potassium: '350mg', phosphorus: '200mg', salt: '0.1g' },
//     { type: '鶏肉 (むね肉)', calories: '244kcal', protein: '19.5g', potassium: '190mg', phosphorus: '120mg', salt: '0.1g' },
//     { type: '鶏肉 (もも肉)', calories: '253kcal', protein: '17.3g', potassium: '160mg', phosphorus: '110mg', salt: '0.1g' },
//     { type: '鶏肉 (ささ身)', calories: '114kcal', protein: '24.6g', potassium: '280mg', phosphorus: '200mg', salt: '0.1g' },
//     { type: '鶏肉 (砂肝)', calories: '94kcal', protein: '18.3g', potassium: '230mg', phosphorus: '140mg', salt: '0.1g' },
//     ];

//     const MeatTable = () => {
//     const [selectedCategory, setSelectedCategory] = useState('');

//     const handleChange = (event) => {
//         setSelectedCategory(event.target.value);
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//         <FormControl fullWidth style={{ marginBottom: '20px' }}>
//             <InputLabel id="meat-select-label">肉類・卵を選んでください</InputLabel>
//             <Select
//             labelId="meat-select-label"
//             value={selectedCategory}
//             onChange={handleChange}
//             label="肉類・卵"
//             >
//             <MenuItem value="meat">肉類</MenuItem>
//             <MenuItem value="egg">卵</MenuItem>
//             </Select>
//         </FormControl>

//         {selectedCategory === 'meat' && (
//             <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                 <TableRow>
//                     <TableCell>肉類</TableCell>
//                     <TableCell>カロリー</TableCell>
//                     <TableCell>タンパク質</TableCell>
//                     <TableCell>カリウム</TableCell>
//                     <TableCell>リン</TableCell>
//                     <TableCell>食塩相当量</TableCell>
//                 </TableRow>
//                 </TableHead>
//                 <TableBody>
//                 {MEAT_DATA.map((row, index) => (
//                     <TableRow key={index}>
//                     <TableCell>{row.type}</TableCell>
//                     <TableCell>{row.calories}</TableCell>
//                     <TableCell>{row.protein}</TableCell>
//                     <TableCell>{row.potassium}</TableCell>
//                     <TableCell>{row.phosphorus}</TableCell>
//                     <TableCell>{row.salt}</TableCell>
//                     </TableRow>
//                 ))}
//                 </TableBody>
//             </Table>
//             </TableContainer>
//         )}

//         {selectedCategory === 'egg' && <p>卵のデータはまだ準備中です。</p>}
//         </div>
//     );
// };

// export default MeatTable;



