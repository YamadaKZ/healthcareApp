import React, { useState } from "react";
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { Calculate, ErrorOutline } from "@mui/icons-material";
import MealArticul from "./MealArticul";
import "./BodyIndex.scss";
import { selectBmr } from "../../features/bmr/bmrSlice";
import { useSelector } from "react-redux";
import axios from "axios";

//const SpoonacularAPIKey = process.env.Spoonacular_APIKey; // Spoonacular API key
const SpoonacularAPIKey = import.meta.env.VITE_SPOONACULAR_API_KEY; // Spoonacular API key

const BodyIndexPage = () => {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [bmiPrime, setBmiPrime] = useState(null);
    const [classification, setClassification] = useState("");
    const [showMealArticul, setShowMealArticul] = useState(false);
    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const bmr = useSelector(selectBmr); // Get BMR value

    const calculateBMI = () => {
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            const bmiPrimeValue = (bmiValue / 25).toFixed(2);

            setBmi(bmiValue);
            setBmiPrime(bmiPrimeValue);

            let classificationText = "";
            if (bmiPrimeValue < 0.64) classificationText = "重度の痩せ";
            else if (bmiPrimeValue < 0.68) classificationText = "中度の痩せ";
            else if (bmiPrimeValue < 0.74) classificationText = "軽度の痩せ";
            else if (bmiPrimeValue <= 1) classificationText = "正常";
            else if (bmiPrimeValue <= 1.2) classificationText = "過体重";
            else if (bmiPrimeValue <= 1.4) classificationText = "肥満（1度）";
            else if (bmiPrimeValue <= 1.6) classificationText = "肥満（2度）";
            else classificationText = "肥満（3度）";

            setClassification(classificationText);
        }
    };

    const resetFields = () => {
        setHeight("");
        setWeight("");
        setBmi(null);
        setBmiPrime(null);
        setClassification("");
        setError("");
        setShowMealArticul(false);
    };

    const fetchMealPlan = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://api.spoonacular.com/mealplanner/generate", {
                params: {
                    timeFrame: "day",
                    targetCalories: bmr,
                    apiKey: SpoonacularAPIKey,
                },
            });
            setMealPlan(response.data);
            setShowMealArticul(true);
        } catch (err) {
            setError("献立を取得できませんでした。");
            setShowMealArticul(false);
        } finally {
            setLoading(false);
        }
    };

    const handleMealGeneration = () => {
        if (!bmr || bmr === 0) {
            setError("BMRの値を計算してください。");
            setShowMealArticul(false);
        } else {
            setError("");
            fetchMealPlan();
        }
    };

    return (
        <div className="container">
            <h2>BMI測定で現状を確認</h2>

            <div className="form-wrapper">
                <div className="form">
                    <div className="input-group">
                        <h3>身長</h3>
                        <TextField
                            variant="outlined"
                            placeholder="cm"
                            size="small"
                            sx={{ width: "80px" }}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <h3>体重</h3>
                        <TextField
                            variant="outlined"
                            placeholder="kg"
                            size="small"
                            sx={{ width: "80px" }}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div className="button-group">
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<Calculate />}
                            sx={{ marginLeft: "10px" }}
                            onClick={calculateBMI}
                        >
                            計算
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ marginLeft: "10px" }}
                            onClick={resetFields}
                        >
                            リセット
                        </Button>
                    </div>
                </div>

                <div className="result">
                    {bmi && (
                        <>
                            <h3>計算結果</h3>
                            <h2>
                                {bmi} <span>kg/m²</span>{" "}
                                <span className="classification-text">
                                    （{classification}）
                                </span>
                            </h2>
                        </>
                    )}
                </div>
            </div>

            <div className="ad-container">
                <img src="gym.png" alt="広告" className="ad-image" />
            </div>

            <div>
                <Box className="bmr-container">
                    <Typography variant="h6" className="bmr-title">
                        あなたの必須カロリー：
                    </Typography>
                    <Typography variant="h4" className="bmr-value">
                        {Math.round(bmr)} kcal
                    </Typography>
                </Box>
                <Typography variant="body2" className="annotation">
                    BMRページで、あなたの必須カロリーを計算しよう
                </Typography>
            </div>

            <h2>あなたにパーソナライズされた料理一覧</h2>
            <h3>必須カロリーから一日分の献立を生成</h3>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#004445", // 薄緑色
                    color: "white",              // テキストの色
                    marginTop: "10px", 
                    fontSize: "16px", 
                    padding: "10px 20px",
                    '&:hover': {
                        backgroundColor: "#6fb98f" // ホバー時の色
                    }
                }}
                onClick={handleMealGeneration}
            >
                献立を生成
            </Button>

            {/* Show loading spinner */}
            {loading && <CircularProgress sx={{ marginTop: "10px" }} />}

            {/* Error message */}
            {error && (
                <Typography
                    variant="body2"
                    color="error"
                    sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
                >
                    <ErrorOutline sx={{ marginRight: "5px" }} />
                    {error}
                </Typography>
            )}

            {/* MealArticul component to display meals */}
            {/* <div className="articleBox ">
                {showMealArticul && mealPlan && mealPlan.meals.map((meal) => (
                    <MealArticul key={meal.id} meal={meal} />
                ))}
            </div> */}
            
            {/* MealArticul component to display meals */}
            {showMealArticul && mealPlan && (
                <div className="articleBox">
                    {mealPlan.meals.map((meal) => (
                        <MealArticul key={meal.id} meal={meal} />
                    ))}
                </div>
            )}

        </div>
    );
};

export default BodyIndexPage;




// import React, { useState } from "react";
// import { TextField, Button, Typography, Box } from "@mui/material";
// import { Calculate, ErrorOutline } from "@mui/icons-material";
// import MealArticul from "./MealArticul";
// import "./BodyIndex.scss";
// import { selectBmr } from "../../features/bmr/bmrSlice";
// import { useSelector } from "react-redux";

// const BodyIndexPage = () => {
//     const [height, setHeight] = useState("");
//     const [weight, setWeight] = useState("");
//     const [bmi, setBmi] = useState(null);
//     const [bmiPrime, setBmiPrime] = useState(null);
//     const [classification, setClassification] = useState("");
//     const [showMealArticul, setShowMealArticul] = useState(false);
//     const [error, setError] = useState("");

//     const bmr = useSelector(selectBmr); // BMRの値を取得

//     const calculateBMI = () => {
//         if (height && weight) {
//             const heightInMeters = height / 100;
//             const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
//             const bmiPrimeValue = (bmiValue / 25).toFixed(2);

//             setBmi(bmiValue);
//             setBmiPrime(bmiPrimeValue);

//             let classificationText = "";
//             if (bmiPrimeValue < 0.64) classificationText = "重度の痩せ";
//             else if (bmiPrimeValue < 0.68) classificationText = "中度の痩せ";
//             else if (bmiPrimeValue < 0.74) classificationText = "軽度の痩せ";
//             else if (bmiPrimeValue <= 1) classificationText = "正常";
//             else if (bmiPrimeValue <= 1.2) classificationText = "過体重";
//             else if (bmiPrimeValue <= 1.4) classificationText = "肥満（1度）";
//             else if (bmiPrimeValue <= 1.6) classificationText = "肥満（2度）";
//             else classificationText = "肥満（3度）";

//             setClassification(classificationText);
//         }
//     };

//     const resetFields = () => {
//         setHeight("");
//         setWeight("");
//         setBmi(null);
//         setBmiPrime(null);
//         setClassification("");
//         setError("");
//         setShowMealArticul(false);
//     };

//     const handleMealGeneration = () => {
//         if (!bmr || bmr === 0) {
//             setError("BMRの値を計算してください。");
//             setShowMealArticul(false);
//         } else {
//             setError("");
//             setShowMealArticul(true);
//         }
//     };

//     return (
//         <div className="container">
//             <h2>BMI測定で現状を確認</h2>

//             <div className="form-wrapper">
//                 <div className="form">
//                     <div className="input-group">
//                         <h3>身長</h3>
//                         <TextField
//                             variant="outlined"
//                             placeholder="cm"
//                             size="small"
//                             sx={{ width: "80px" }}
//                             value={height}
//                             onChange={(e) => setHeight(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-group">
//                         <h3>体重</h3>
//                         <TextField
//                             variant="outlined"
//                             placeholder="kg"
//                             size="small"
//                             sx={{ width: "80px" }}
//                             value={weight}
//                             onChange={(e) => setWeight(e.target.value)}
//                         />
//                     </div>
//                     <div className="button-group">
//                         <Button
//                             variant="contained"
//                             color="success"
//                             startIcon={<Calculate />}
//                             sx={{ marginLeft: "10px" }}
//                             onClick={calculateBMI}
//                         >
//                             計算
//                         </Button>
//                         <Button
//                             variant="contained"
//                             color="secondary"
//                             sx={{ marginLeft: "10px" }}
//                             onClick={resetFields}
//                         >
//                             リセット
//                         </Button>
//                     </div>
//                 </div>

//                 <div className="result">
//                     {bmi && (
//                         <>
//                             <h3>計算結果</h3>
//                             <h2>
//                                 {bmi} <span>kg/m²</span>{" "}
//                                 <span className="classification-text">
//                                     （{classification}）
//                                 </span>
//                             </h2>
//                         </>
//                     )}
//                 </div>
//             </div>

//             <div className="ad-container">
//                 <img src="gym.png" alt="広告" className="ad-image" />
//             </div>

//             <div>
//                 <Box className="bmr-container">
//                     <Typography variant="h6" className="bmr-title">
//                         あなたの必須カロリー：
//                     </Typography>
//                     <Typography variant="h4" className="bmr-value">
//                         {Math.round(bmr)} kcal
//                     </Typography>
//                 </Box>
//                 <Typography variant="body2" className="annotation">
//                     BMRページで、あなたの必須カロリーを計算しよう
//                 </Typography>
//             </div>

//             <h2>あなたにパーソナライズされた料理一覧</h2>
//             <h3>必須カロリーから一日分の献立を生成</h3>
//             <Button
//                 variant="contained"
//                 sx={{
//                     backgroundColor: "#004445", // 薄緑色
//                     color: "white",              // テキストの色
//                     marginTop: "10px", 
//                     fontSize: "16px", 
//                     padding: "10px 20px",
//                     '&:hover': {
//                         backgroundColor: "#6fb98f" // ホバー時の色
//                     }
//                 }}
//                 onClick={handleMealGeneration}
//             >
//                 献立を生成
//             </Button>

//             {error && (
//                 <Typography
//                     variant="body2"
//                     color="error"
//                     sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
//                 >
//                     <ErrorOutline sx={{ marginRight: "5px" }} />
//                     {error}
//                 </Typography>
//             )}
//             {showMealArticul && <MealArticul />}
//         </div>
//     );
// };

// export default BodyIndexPage;




// import React, { useState } from "react";
// import { TextField, Button, Typography, Box } from "@mui/material";
// import { Calculate } from "@mui/icons-material";
// import MealArticul from "./MealArticul";
// import "./BodyIndex.scss";
// import { selectBmr } from "../../features/bmr/bmrSlice";
// import { useSelector } from "react-redux";

// const BodyIndexPage = () => {
//     const [height, setHeight] = useState("");
//     const [weight, setWeight] = useState("");
//     const [bmi, setBmi] = useState(null);
//     const [bmiPrime, setBmiPrime] = useState(null);
//     const [classification, setClassification] = useState("");

//     const bmr = useSelector(selectBmr); // BMRの値を取得

//     const calculateBMI = () => {
//         if (height && weight) {
//             const heightInMeters = height / 100;
//             const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
//             const bmiPrimeValue = (bmiValue / 25).toFixed(2);

//             setBmi(bmiValue);
//             setBmiPrime(bmiPrimeValue);

//             let classificationText = "";
//             if (bmiPrimeValue < 0.64) classificationText = "重度の痩せ";
//             else if (bmiPrimeValue < 0.68) classificationText = "中度の痩せ";
//             else if (bmiPrimeValue < 0.74) classificationText = "軽度の痩せ";
//             else if (bmiPrimeValue <= 1) classificationText = "正常";
//             else if (bmiPrimeValue <= 1.2) classificationText = "過体重";
//             else if (bmiPrimeValue <= 1.4) classificationText = "肥満（1度）";
//             else if (bmiPrimeValue <= 1.6) classificationText = "肥満（2度）";
//             else classificationText = "肥満（3度）";

//             setClassification(classificationText);
//         }
//     };

//     const resetFields = () => {
//         setHeight("");
//         setWeight("");
//         setBmi(null);
//         setBmiPrime(null);
//         setClassification("");
//     };

//     return (
//         <div className="container">
//             <h2>BMI測定で現状を確認</h2>

//             <div className="form-wrapper">
//                 <div className="form">
//                     <div className="input-group">
//                         <h3>身長</h3>
//                         <TextField
//                             variant="outlined"
//                             placeholder="cm"
//                             size="small"
//                             sx={{ width: "80px" }}
//                             value={height}
//                             onChange={(e) => setHeight(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-group">
//                         <h3>体重</h3>
//                         <TextField
//                             variant="outlined"
//                             placeholder="kg"
//                             size="small"
//                             sx={{ width: "80px" }}
//                             value={weight}
//                             onChange={(e) => setWeight(e.target.value)}
//                         />
//                     </div>
//                     <div className="button-group">
//                         <Button
//                             variant="contained"
//                             color="success"
//                             startIcon={<Calculate />}
//                             sx={{ marginLeft: "10px" }}
//                             onClick={calculateBMI}
//                         >
//                             計算
//                         </Button>
//                         <Button
//                             variant="contained"
//                             color="secondary"
//                             sx={{ marginLeft: "10px" }}
//                             onClick={resetFields}
//                         >
//                             リセット
//                         </Button>
//                     </div>
//                 </div>

//                 <div className="result">
//                     {bmi && (
//                         <>
//                             <h3>計算結果</h3>
//                             <h2>
//                                 {bmi} <span>kg/m²</span> <span className="classification-text">（{classification}）</span>
//                             </h2>
//                         </>
//                     )}
//                 </div>
//             </div>
//              {/* 右上に広告画像 */}
//             <div className="ad-container">
//                 <img src="gym.png" alt="広告" className="ad-image" />
//             </div>

//             <div >
//                 {/* <h2>必須カロリー：</h2> */}
//                 <Box className="bmr-container">
//                     <Typography variant="h6" className="bmr-title">
//                         あなたの必須カロリー：
//                     </Typography>
//                     <Typography variant="h4" className="bmr-value">
//                         {Math.round(bmr)} kcal
//                     </Typography>
//                 </Box>
//                 <Typography variant="body2" className="annotation">
//                 BMRページで、あなたの必須カロリーを計算しよう
//                 </Typography>
//             </div>
//             <h2>あなたにパーソナライズされた料理一覧</h2>
//             <h3>必須カロリーから一日分の献立を生成</h3>
//             <button>献立を生成</button>
//             <Typography variant="body2" className="annotation">
//                 必須カロリーに値が入っていることを確認してください
//             </Typography>
//             <MealArticul />
//         </div>
//     );
// };

// export default BodyIndexPage;









// import React from "react";
// import { TextField, Button } from "@mui/material";
// import { Calculate } from "@mui/icons-material";
// import MealArticul from "./MealArticul";
// import "./BodyIndex.scss";

// const BodyIndexPage = () => {
//     return (
//         <div className="container">
//             <h2>あなたのカロリー指標(BMI)</h2>

//             <div className="form-wrapper">
//                 <div className="form">
//                     {/* 身長と体重の入力欄と計算ボタン */}
//                     <div className="input-group">
//                         <h3>身長</h3>
//                         <TextField 
//                             variant="outlined" 
//                             placeholder="cm" 
//                             size="small" 
//                             sx={{ width: "80px" }} 
//                         />
//                     </div>
//                     <div className="input-group">
//                         <h3>体重</h3>
//                         <TextField 
//                             variant="outlined" 
//                             placeholder="kg" 
//                             size="small" 
//                             sx={{ width: "80px" }} 
//                         />
//                     </div>
//                     <div className="button">
//                             <Button 
//                                 variant="contained" 
//                                 color="success" 
//                                 startIcon={<Calculate />} 
//                                 sx={{ marginLeft: "10px" }}
//                             >
//                                 計算
//                             </Button>
//                         </div>
//                 </div>

//                 {/* 計算結果を下の中央に配置 */}
//                 <div className="result">
//                     <h3>計算結果</h3>
//                     <h2>
//                         20.1 <span>kg/m²</span> <span className="normal-text">（正常）</span>
//                     </h2>
//                 </div>
//             </div>

//             {/* 右側にBMI表と画像を配置 */}
//             {/* <div className="bmi-info">
//                 <h2>成人のBMI表</h2>
//                 <img src="BMI.png" alt="BMI表" />
//             </div> */}

//             {/* 右上に広告画像 */}
//             <div className="ad-container">
//                 <img src="gym.png" alt="広告" className="ad-image" />
//             </div>
//             <div className="title">
//                 <h2>あなたにパーソナライズされた料理一覧</h2>
//             </div>
//             <MealArticul />
//             <MealArticul />
//             <MealArticul />
//         </div>
//     );
// };

// export default BodyIndexPage;





// import React from "react";
// import "./BodyIndex.scss";

// const BodyIndexPage = () => {
//     return (
//         <div className="container">
//             <h2>あなたのカロリー指標(BMI)</h2>

//             <div className="form-wrapper">
//                 <div className="form">
//                     {/* 身長と体重を横並び */}
//                     <div className="left-column">
//                         <h3>身長</h3>
//                         <input type="text" placeholder="cm" />
//                     </div>
//                     <div className="right-column">
//                         <h3>体重</h3>
//                         <input type="text" placeholder="kg" />
//                     </div>
//                 </div>

//                 {/* 計算ボタンを中央に配置 */}
//                 <div className="button-container">
//                     <button className="calculate-button">計算</button>
//                 </div>

//                 {/* 計算結果を中央に表示 */}
//                 <div className="result">
//                     <h3>計算結果</h3>
//                     <h2>20.1 </h2>
//                 </div>
//             </div>

//             {/* 右側にBMI表と画像を配置 */}
//             <div className="bmi-info">
//                 <h2>成人のBMI表</h2>
//                 <img src="BMI.png" alt="BMI表" />
//             </div>
//         </div>
//     );
// };

// export default BodyIndexPage;





// import React from "react";

// const BodyIndexPage = () => {
//     return (
//         <>
//         <h2>あなたのカロリー指標(BMI)</h2>
//         <h3>身長</h3>
//         <input type="text"/>
//         <h3>体重</h3>
//         <input type=""/>
//         <h3>計算結果</h3>
//         <button>計算</button>
//         <h2>20.1</h2>
//         <h2>成人のBMI表</h2>
//         <img src="BMI.png"/>
//         <h2>あなたにパーソナライズされた料理</h2>
//         </>
//     );
// }

// export default BodyIndexPage;