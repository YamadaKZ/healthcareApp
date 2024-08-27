import React from "react";
import { TextField, Button } from "@mui/material";
import { Calculate } from "@mui/icons-material";
import MealArticul from "./MealArticul";
import "./BodyIndex.scss";

const BodyIndexPage = () => {
    return (
        <div className="container">
            <h2>あなたのカロリー指標(BMI)</h2>

            <div className="form-wrapper">
                <div className="form">
                    {/* 身長と体重の入力欄と計算ボタン */}
                    <div className="input-group">
                        <h3>身長</h3>
                        <TextField 
                            variant="outlined" 
                            placeholder="cm" 
                            size="small" 
                            sx={{ width: "80px" }} 
                        />
                    </div>
                    <div className="input-group">
                        <h3>体重</h3>
                        <TextField 
                            variant="outlined" 
                            placeholder="kg" 
                            size="small" 
                            sx={{ width: "80px" }} 
                        />
                    </div>
                    <div className="button">
                            <Button 
                                variant="contained" 
                                color="success" 
                                startIcon={<Calculate />} 
                                sx={{ marginLeft: "10px" }}
                            >
                                計算
                            </Button>
                        </div>
                </div>

                {/* 計算結果を下の中央に配置 */}
                <div className="result">
                    <h3>計算結果</h3>
                    <h2>
                        20.1 <span>kg/m²</span> <span className="normal-text">（正常）</span>
                    </h2>
                </div>
            </div>

            {/* 右側にBMI表と画像を配置 */}
            {/* <div className="bmi-info">
                <h2>成人のBMI表</h2>
                <img src="BMI.png" alt="BMI表" />
            </div> */}

            {/* 右上に広告画像 */}
            <div className="ad-container">
                <img src="gym.png" alt="広告" className="ad-image" />
            </div>
            <div className="title">
                <h2>あなたにパーソナライズされた料理一覧</h2>
            </div>
            <MealArticul />
            <MealArticul />
            <MealArticul />
        </div>
    );
};

export default BodyIndexPage;





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