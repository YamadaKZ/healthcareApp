// HomePage.jsx
import React, { useState } from "react";
import { Button, TextField, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import "./HomePage.scss";
import HomeResult from "./HomeResult";

const HomePage = () => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male'); // default to male
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [bmr, setBmr] = useState(null);

    const calculateBMR = () => {
        let bmrValue = 0;
        if (gender === 'male') {
            bmrValue = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseInt(age) + 5;
        } else {
            bmrValue = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseInt(age) - 161;
        }

        let activityMultiplier = 1.2; // Default for sedentary
        switch (activityLevel) {
            case "Rarely":
                activityMultiplier = 1.2;
                break;
            case "some":
                activityMultiplier = 1.375;
                break;
            case "aLittle":
                activityMultiplier = 1.55;
                break;
            case "very":
                activityMultiplier = 1.725;
                break;
            default:
                activityMultiplier = 1.2;
        }

        const finalBMR = bmrValue * activityMultiplier;
        setBmr(finalBMR);
    };

    return (
        <div className="container">
            <h2>あなたの必須カロリーを計算しよう！</h2>

            {/* フォーム全体を枠で囲む */}
            <div className="form-wrapper">
                <div className="form">
                    {/* 左側に年齢と性別 */}
                    <div className="left-column">
                        <div className="age-gender-group">
                            <h3>年齢</h3>
                            <div className="age-input">
                                <TextField
                                    variant="outlined"
                                    placeholder="年齢"
                                    size="small"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    sx={{ borderRadius: "25px", width: "80px" }}
                                />
                                <span>歳</span>
                            </div>

                            <h3>性別</h3>
                            <div className="gender-options">
                                <FormControlLabel
                                    control={<Checkbox checked={gender === 'female'} onChange={() => setGender('female')} />}
                                    label="女"
                                    sx={{ marginRight: "10px" }}
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={gender === 'male'} onChange={() => setGender('male')} />}
                                    label="男"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 右側に身長と体重 */}
                    <div className="middle-column">
                        <div className="height-weight-group">
                            <h3>身長</h3>
                            <div className="height-weight-input">
                                <TextField
                                    variant="outlined"
                                    placeholder="身長"
                                    size="small"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    sx={{ borderRadius: "25px", width: "80px" }}
                                />
                                <span>cm</span>
                            </div>

                            <h3>体重</h3>
                            <div className="height-weight-input">
                                <TextField
                                    variant="outlined"
                                    placeholder="体重"
                                    size="small"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    sx={{ borderRadius: "25px", width: "80px" }}
                                />
                                <span>kg</span>
                            </div>
                        </div>
                    </div>

                    {/* 運動量を右端に配置 */}
                    <div className="right-column">
                        <h3>運動量</h3>
                        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>運動量</InputLabel>
                            <Select
                                label="運動量"
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                                sx={{
                                    borderRadius: "25px",
                                    "& .Mui-selected": { color: "green" },
                                }}
                            >
                                <MenuItem value="Rarely">ほとんどしない</MenuItem>
                                <MenuItem value="some">1～3回/週</MenuItem>
                                <MenuItem value="aLittle">4～5回/週</MenuItem>
                                <MenuItem value="very">6～7回/週、それ以上</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                {/* ボタンを中央下に配置 */}
                <div className="buttons">
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ color: "white", borderRadius: "25px" }}
                        onClick={calculateBMR}
                    >
                        計算
                    </Button>
                    <Button
                        variant="outlined"
                        color="success"
                        sx={{ backgroundColor: "white", borderRadius: "25px", marginLeft: "10px" }}
                        onClick={() => {
                            setAge('');
                            setGender('male');
                            setHeight('');
                            setWeight('');
                            setActivityLevel('');
                            setBmr(null);
                        }}
                    >
                        リセット
                    </Button>
                </div>
            </div>

            {/* 右上に広告画像 */}
            <div className="ad-container">
                <img src="fitness.png" alt="広告" className="ad-image" />
            </div>

            {/* HomeResult.jsx をここに表示 */}
            {bmr && <HomeResult bmr={bmr} />}
        </div>
    );
};

export default HomePage;





// // HomePage.jsx
// import React from "react";
// import { Button, TextField, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// import "./HomePage.scss";
// import HomeResult from "./HomeResult";

// const HomePage = () => {
//     return (
//         <div className="container">
//             <h2>あなたの必須カロリーを計算しよう！</h2>

//             {/* フォーム全体を枠で囲む */}
//             <div className="form-wrapper">
//                 <div className="form">
//                     {/* 左側に年齢と性別 */}
//                     <div className="left-column">
//                         <div className="age-gender-group">
//                             <h3>年齢</h3>
//                             <div className="age-input">
//                                 <TextField
//                                     variant="outlined"
//                                     placeholder="年齢"
//                                     size="small"
//                                     sx={{ borderRadius: "25px", width: "80px" }}
//                                 />
//                                 <span>歳</span>
//                             </div>

//                             <h3>性別</h3>
//                             <div className="gender-options">
//                                 <FormControlLabel
//                                     control={<Checkbox />}
//                                     label="女"
//                                     sx={{ marginRight: "10px" }}
//                                 />
//                                 <FormControlLabel
//                                     control={<Checkbox />}
//                                     label="男"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* 右側に身長と体重 */}
//                     <div className="middle-column">
//                         <div className="height-weight-group">
//                             <h3>身長</h3>
//                             <div className="height-weight-input">
//                                 <TextField
//                                     variant="outlined"
//                                     placeholder="身長"
//                                     size="small"
//                                     sx={{ borderRadius: "25px", width: "80px" }}
//                                 />
//                                 <span>cm</span>
//                             </div>

//                             <h3>体重</h3>
//                             <div className="height-weight-input">
//                                 <TextField
//                                     variant="outlined"
//                                     placeholder="体重"
//                                     size="small"
//                                     sx={{ borderRadius: "25px", width: "80px" }}
//                                 />
//                                 <span>kg</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* 運動量を右端に配置 */}
//                     <div className="right-column">
//                         <h3>運動量</h3>
//                         <FormControl variant="outlined" sx={{ minWidth: 120 }}>
//                             <InputLabel>運動量</InputLabel>
//                             <Select
//                                 label="運動量"
//                                 defaultValue=""
//                                 sx={{
//                                     borderRadius: "25px",
//                                     "& .Mui-selected": { color: "green" },
//                                 }}
//                             >
//                                 <MenuItem value="Rarely">ほとんどしない</MenuItem>
//                                 <MenuItem value="some">ちょっとする: 1～3回/週</MenuItem>
//                                 <MenuItem value="aLittle">そこそこする: 4～5回/週</MenuItem>
//                                 <MenuItem value="aLittle">毎日運動、または週3～4回の激しい運動</MenuItem>
//                                 <MenuItem value="very">とてもする: 6～7回/週、それ以上</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </div>
//                 </div>

//                 {/* ボタンを中央下に配置 */}
//                 <div className="buttons">
//                     <Button
//                         variant="contained"
//                         color="success"
//                         sx={{ color: "white", borderRadius: "25px" }}
//                     >
//                         計算
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         color="success"
//                         sx={{ backgroundColor: "white", borderRadius: "25px", marginLeft: "10px" }}
//                     >
//                         リセット
//                     </Button>
//                 </div>
//             </div>

//             {/* 右上に広告画像 */}
//             <div className="ad-container">
//                 <img src="fitness.png" alt="広告" className="ad-image" />
//             </div>

//             {/* HomeResult.jsx をここに表示 */}
//             <HomeResult />
//         </div>
//     );
// };

// export default HomePage;





// import React from "react";
// import { Button, TextField, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// import "./HomePage.scss";
// import HomeResult from "./HomeResult";

// const HomePage = () => {
//     return (
//         <div className="container">
//             <h2>あなたの必須カロリーを計算しよう！</h2>

//             <div className="form">
//                 {/* 左側のフォーム */}
//                 <div className="left-column">
//                     <h3>年齢</h3>
//                     <div className="age-input">
//                         <TextField 
//                             variant="outlined"
//                             placeholder="年齢"
//                             size="small" 
//                             sx={{ borderRadius: "25px", width: "80px" }} // サイズと丸みを統一
//                         />
//                         <span>歳</span>
//                     </div>

//                     <h3>性別</h3>
//                     <div className="gender-options">
//                         <FormControlLabel 
//                             control={<Checkbox />} 
//                             label="女" 
//                             sx={{ marginRight: "10px" }}
//                         />
//                         <FormControlLabel 
//                             control={<Checkbox />} 
//                             label="男" 
//                         />
//                     </div>

//                     <h3>身長</h3>
//                     <div className="height-weight-input">
//                         <TextField 
//                             variant="outlined"
//                             placeholder="身長"
//                             size="small" 
//                             sx={{ borderRadius: "25px", width: "80px" }} 
//                         />
//                         <span>cm</span>
//                     </div>

//                     <h3>体重</h3>
//                     <div className="height-weight-input">
//                         <TextField 
//                             variant="outlined"
//                             placeholder="体重"
//                             size="small" 
//                             sx={{ borderRadius: "25px", width: "80px" }}
//                         />
//                         <span>kg</span>
//                     </div>

//                     <div className="buttons">
//                         <Button 
//                             variant="contained" 
//                             color="success" 
//                             sx={{ color: "white", borderRadius: "25px" }}
//                         >
//                             計算
//                         </Button>
//                         <Button 
//                             variant="outlined" 
//                             color="success" 
//                             sx={{ backgroundColor: "white", borderRadius: "25px", marginLeft: "10px" }}
//                         >
//                             リセット
//                         </Button>
//                     </div>
//                 </div>

//                 {/* 右側のセレクトボックス */}
//                 <div className="right-column">
//                     <h3>運動量</h3>
//                     <FormControl variant="outlined" sx={{ minWidth: 120 }}>
//                         <InputLabel>運動量</InputLabel>
//                         <Select
//                             label="運動量"
//                             defaultValue=""
//                             sx={{
//                                 borderRadius: "25px",
//                                 "& .Mui-selected": { color: "green" },
//                             }}
//                         >
//                             <MenuItem value="Rarely">ほとんどしない</MenuItem>
//                             <MenuItem value="some">ちょっとする: 1～3回/週</MenuItem>
//                             <MenuItem value="aLittle">そこそこする: 1～5回/週</MenuItem>
//                             <MenuItem value="very">とてもする: 6～7回/週、それ以上</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </div>
//             </div>

//             {/* HomeResult.jsx をここに表示 */}
//             <HomeResult />
//         </div>
//     );
// };

// export default HomePage;






// // src/pages/HomePage.jsx
// import React from "react";
// import { useInitialFetch } from "../../hooks/useInitialFetch";
// import { TextField } from "formik-material-ui";

// const HomePage = () => {

//     useInitialFetch();

    
//     return (
//         <>
//         <h2>あなたの必須カロリーを計算しよう！</h2>
//             <h3>年齢</h3>
//             <input type="text" placeholder="age"/>
//             <h3>性別</h3>
//             <input type="checkbox" />
//             <input type="checkbox" />
//             <h3>身長</h3>
//             <input type="text"/>
//             <h3>体重</h3>
//             <input type="text"/>
//             <h3>運動量</h3>
//             <select name="activity">
//                 <option value="Rarely">ほとんどしない</option>
//                 <option value="some">1～3回/週</option>
//                 <option value="aLittle">1～5回/週</option>
//                 <option value="very">6～7回/週、それ以上</option>
//             </select>
//             <button>計算</button>
//             <button>リセット</button>
//             <h3>結果</h3>
//         </>
//     )
// };

// export default HomePage;
