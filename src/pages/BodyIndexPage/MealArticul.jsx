import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import "./MealArticul.scss"; // SCSSファイルをインポート

const MealArticul = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="meal-articul-container">
            {/* 画像部分 */}
            <img 
                src="vegetable.png" 
                alt="鶏と野菜の炒め物" 
                className="meal-articul-image"
            />
            
            {/* 文章部分 */}
            <div className="meal-articul-content">
                <h2>鶏と野菜の炒め物</h2>
                <h3>タンパク質を豊富に含んだ野菜炒め。カロリー控えめで栄養満点</h3>
                <Button variant="contained" onClick={handleOpen}>詳細</Button>
            </div>

            {/* Modal部分 */}
            <Modal open={open} onClose={handleClose}>
                <Box className="meal-articul-modal">
                    <img 
                        src="vegetable.png" 
                        alt="鶏と野菜の炒め物" 
                        className="meal-articul-modal-image"
                    />
                    <div className="meal-articul-modal-content">
                        <h2>鶏と野菜の炒め物</h2>
                        <p>タンパク質を豊富に含んだ野菜炒め。カロリー控えめで栄養満点。</p>
                        <h4>具材</h4>
                        <ul>
                            <li>鶏肉</li>
                            <li>キャベツ</li>
                            <li>にんじん</li>
                            <li>ブロッコリー</li>
                            <li>ピーマン</li>
                        </ul>
                    </div>
                    <Button variant="outlined" onClick={handleClose}>閉じる</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default MealArticul;





// import React from "react";
// import { Modal } from "@mui/material";


// const MealArticul = () => {
//     return (
//         <div>
//         <img src="vegetable.png" />
//             <h2>鶏と野菜の炒め物</h2>
//             <h3>タンパク質を豊富に含んだ野菜炒め。カロリー控えめで栄養満点</h3>
//             <button>詳細</button>
//         </div>  
//     )
// }


// export default MealArticul;
