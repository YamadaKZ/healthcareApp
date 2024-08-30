import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import "./MealArticul.scss";

//const SpoonacularAPIKey = process.env.Spoonacular_APIKey; // Spoonacular APIキー
const SpoonacularAPIKey = import.meta.env.VITE_SPOONACULAR_API_KEY; // Spoonacular API key

const MealArticul = ({ meal }) => {
    const [open, setOpen] = useState(false);
    const [mealDetails, setMealDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    // キャッシュの確認
    const checkLocalStorage = (mealId) => {
        const cachedMeal = localStorage.getItem(`meal_${mealId}`);
        return cachedMeal ? JSON.parse(cachedMeal) : null;
    };

    // キャッシュに保存
    const saveToLocalStorage = (mealId, mealData) => {
        localStorage.setItem(`meal_${mealId}`, JSON.stringify(mealData));
    };

    const handleOpen = async () => {
        setOpen(true);
        const cachedMeal = checkLocalStorage(meal.id);
        
        if (cachedMeal) {
            setMealDetails(cachedMeal);
        } else {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${meal.id}/information`, {
                    params: {
                        apiKey: SpoonacularAPIKey,
                        includeNutrition: true,
                    },
                });
                setMealDetails(response.data);
                saveToLocalStorage(meal.id, response.data); // キャッシュに保存
            } catch (error) {
                console.error("Error fetching meal details:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="meal-articul-container">
            {/* 画像部分 */}
            <img
                src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
                alt={meal.title}
                className="meal-articul-image"
            />

            {/* 文章部分 */}
            <div className="meal-articul-content">
                <Typography variant="h5">{meal.title}</Typography>
                
                <Typography variant="body1">
                    カロリー: {mealDetails && mealDetails.nutrition && mealDetails.nutrition.nutrients
                        ? mealDetails.nutrition.nutrients.find(nutrient => nutrient.name === "Calories")?.amount
                        : "N/A"} kcal
                </Typography>

                <Button 
                    variant="contained" 
                    onClick={handleOpen} 
                    sx={{ backgroundColor: "#6fb98f", color: "#fff", '&:hover': { backgroundColor: "#004445" } }}
                >
                    詳細を見る
                </Button>
            </div>

            {/* Modal部分 */}
            <Modal open={open} onClose={handleClose}>
                <Box className="meal-articul-modal">
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        mealDetails && (
                            <div className="meal-articul-modal-scrollable">
                                <img
                                    src={`https://spoonacular.com/recipeImages/${mealDetails.id}-312x231.jpg`}
                                    alt={mealDetails.title}
                                    className="meal-articul-modal-image"
                                />
                                <div className="meal-articul-modal-content">
                                    <Typography variant="h4">{mealDetails.title}</Typography>
                                    <Typography variant="body1">準備時間: {mealDetails.readyInMinutes} 分</Typography>
                                    <Typography variant="body1">カロリー: {mealDetails.nutrition.nutrients.find(nutrient => nutrient.name === "Calories").amount} kcal</Typography>
                                    <Typography variant="body1">料理の説明: {mealDetails.summary.replace(/<\/?[^>]+(>|$)/g, "")}</Typography>
                                    <Typography variant="h6">材料:</Typography>
                                    <ul>
                                        {mealDetails.extendedIngredients.map((ingredient) => (
                                            <li key={ingredient.id}>
                                                {ingredient.original}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant="outlined" onClick={handleClose}>閉じる</Button>
                                </div>
                            </div>
                        )
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default MealArticul;





// import React, { useState, useEffect } from "react";
// import { Modal, Box, Button, Typography, CircularProgress } from "@mui/material";
// import axios from "axios";
// import "./MealArticul.scss";

// const SpoonacularAPIKey = "a3927dd920ed4314a44e9982f89097ea"; // Spoonacular APIキー

// const MealArticul = ({ meal }) => {
//     const [open, setOpen] = useState(false);
//     const [mealDetails, setMealDetails] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleOpen = async () => {
//         setOpen(true);
//         setLoading(true);
//         try {
//             const response = await axios.get(`https://api.spoonacular.com/recipes/${meal.id}/information`, {
//                 params: {
//                     apiKey: SpoonacularAPIKey,
//                     includeNutrition: true,
//                 },
//             });
//             setMealDetails(response.data);
//         } catch (error) {
//             console.error("Error fetching meal details:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div className="meal-articul-container">
//             {/* 画像部分 */}
//             <img
//                 src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
//                 alt={meal.title}
//                 className="meal-articul-image"
//             />

//             {/* 文章部分 */}
//             <div className="meal-articul-content">
//                 <Typography variant="h5">{meal.title}</Typography>
//                 <Button 
//                     variant="contained" 
//                     onClick={handleOpen} 
//                     sx={{ backgroundColor: "#6fb98f", color: "#fff", '&:hover': { backgroundColor: "#004445" } }}
//                 >
//                     詳細を見る
//                 </Button>
//             </div>

//             {/* Modal部分 */}
//             <Modal open={open} onClose={handleClose}>
//                 <Box className="meal-articul-modal">
//                     {loading ? (
//                         <CircularProgress />
//                     ) : (
//                         mealDetails && (
//                             <>
//                                 <img
//                                     src={`https://spoonacular.com/recipeImages/${mealDetails.id}-312x231.jpg`}
//                                     alt={mealDetails.title}
//                                     className="meal-articul-modal-image"
//                                 />
//                                 <div className="meal-articul-modal-content">
//                                     <Typography variant="h4">{mealDetails.title}</Typography>
//                                     <Typography variant="body1">準備時間: {mealDetails.readyInMinutes} 分</Typography>
//                                     <Typography variant="body1">カロリー: {mealDetails.nutrition.nutrients.find(nutrient => nutrient.name === "Calories").amount} kcal</Typography>
//                                     <Typography variant="body1">料理の説明: {mealDetails.summary.replace(/<\/?[^>]+(>|$)/g, "")}</Typography>
//                                     <Typography variant="h6">材料:</Typography>
//                                     <ul>
//                                         {mealDetails.extendedIngredients.map((ingredient) => (
//                                             <li key={ingredient.id}>
//                                                 {ingredient.original}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                     <Button variant="outlined" onClick={handleClose}>閉じる</Button>
//                                 </div>
//                             </>
//                         )
//                     )}
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default MealArticul;



// import React, { useState } from "react";
// import { Modal, Box, Button, Typography } from "@mui/material";
// import "./MealArticul.scss"; // SCSSファイルをインポート

// const MealArticul = ({ meal }) => {
//     const [open, setOpen] = useState(false);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     return (
//         <div className="meal-articul-container">
//             {/* 画像部分 */}
//             <img
//                 src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
//                 alt={meal.title}
//                 className="meal-articul-image"
//             />

//             {/* 文章部分 */}
//             <div className="meal-articul-content">
//                 <Typography variant="h5">{meal.title}</Typography>
//                 <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: "#98FB98" }}>
//                     詳細
//                 </Button>
//             </div>

//             {/* Modal部分 */}
//             <Modal open={open} onClose={handleClose}>
//                 <Box className="meal-articul-modal">
//                     <img
//                         src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
//                         alt={meal.title}
//                         className="meal-articul-modal-image"
//                     />
//                     <div className="meal-articul-modal-content">
//                         <Typography variant="h4">{meal.title}</Typography>
//                         <Typography variant="body1">準備時間: {meal.readyInMinutes} 分</Typography>
//                         <Typography variant="body2">カロリー: {meal.calories} kcal</Typography>
//                         <Button variant="outlined" onClick={handleClose}>閉じる</Button>
//                     </div>
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default MealArticul;




// import React, { useState } from "react";
// import { Modal, Box, Button } from "@mui/material";
// import "./MealArticul.scss"; // SCSSファイルをインポート

// const MealArticul = () => {
//     const [open, setOpen] = useState(false);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     return (
//         <div className="meal-articul-container">
//             {/* 画像部分 */}
//             <img 
//                 src="vegetable.png" 
//                 alt="鶏と野菜の炒め物" 
//                 className="meal-articul-image"
//             />
            
//             {/* 文章部分 */}
//             <div className="meal-articul-content">
//                 <h2>鶏と野菜の炒め物</h2>
//                 <h3>タンパク質を豊富に含んだ野菜炒め。カロリー控えめで栄養満点</h3>
//                 <Button variant="contained" onClick={handleOpen}>詳細</Button>
//             </div>

//             {/* Modal部分 */}
//             <Modal open={open} onClose={handleClose}>
//                 <Box className="meal-articul-modal">
//                     <img 
//                         src="vegetable.png" 
//                         alt="鶏と野菜の炒め物" 
//                         className="meal-articul-modal-image"
//                     />
//                     <div className="meal-articul-modal-content">
//                         <h2>鶏と野菜の炒め物</h2>
//                         <p>タンパク質を豊富に含んだ野菜炒め。カロリー控えめで栄養満点。</p>
//                         <h4>具材</h4>
//                         <ul>
//                             <li>鶏肉</li>
//                             <li>キャベツ</li>
//                             <li>にんじん</li>
//                             <li>ブロッコリー</li>
//                             <li>ピーマン</li>
//                         </ul>
//                     </div>
//                     <Button variant="outlined" onClick={handleClose}>閉じる</Button>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }

// export default MealArticul;





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
