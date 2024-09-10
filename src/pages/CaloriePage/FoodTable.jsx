import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FOOD_DATA } from '../../utils/foodData';
import './FoodTable.scss'; // SCSSファイルをインポート

const FoodTable = ({ category }) => {
    const categoryData = FOOD_DATA[category] || [];

    const getCategoryName = (category) => {
        switch (category) {
            case 'meat':
                return '肉類';
            case 'grain':
                return '穀類';
            case 'fish':
                return '魚介類';
            case 'vegetable':
                return '野菜';
            case 'fruit':
                return '果物';
            case 'oil':
                return '油脂類';
            default:
                return '不明なカテゴリ';
        }
    };

    return (
        <TableContainer component={Paper} className="food-table-container">
            <Table className="food-table">
                <TableHead className="table-header">
                    <TableRow>
                        <TableCell>{getCategoryName(category)}</TableCell>
                        <TableCell>カロリー</TableCell>
                        <TableCell>タンパク質</TableCell>
                        <TableCell>カリウム</TableCell>
                        <TableCell>リン</TableCell>
                        <TableCell>食塩相当量</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categoryData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.protein}</TableCell>
                            <TableCell>{row.potassium}</TableCell>
                            <TableCell>{row.phosphorus}</TableCell>
                            <TableCell>{row.salt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FoodTable;



// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { FOOD_DATA } from '../../utils/foodData';

// const FoodTable = ({ category }) => {
//     const categoryData = FOOD_DATA[category] || [];

//     // カテゴリ名を決定する関数
//     const getCategoryName = (category) => {
//         switch (category) {
//             case 'meat':
//                 return '肉類';
//             case 'grain':
//                 return '穀類';
//             case 'fish':
//                 return '魚介類';
//             case 'vegetable':
//                 return '野菜'
//             case 'fruit':
//                 return '果物'
//             case 'oil':
//                 return '油脂類'
//             default:
//                 return '不明なカテゴリ';
//         }
//     };

//     return (
//         <TableContainer component={Paper}>
//         <Table>
//             <TableHead>
//             <TableRow>
//                 <TableCell>{getCategoryName(category)}</TableCell>
//                 <TableCell>カロリー</TableCell>
//                 <TableCell>タンパク質</TableCell>
//                 <TableCell>カリウム</TableCell>
//                 <TableCell>リン</TableCell>
//                 <TableCell>食塩相当量</TableCell>
//             </TableRow>
//             </TableHead>
//             <TableBody>
//             {categoryData.map((row, index) => (
//                 <TableRow key={index}>
//                 <TableCell>{row.type}</TableCell>
//                 <TableCell>{row.calories}</TableCell>
//                 <TableCell>{row.protein}</TableCell>
//                 <TableCell>{row.potassium}</TableCell>
//                 <TableCell>{row.phosphorus}</TableCell>
//                 <TableCell>{row.salt}</TableCell>
//                 </TableRow>
//             ))}
//             </TableBody>
//         </Table>
//         </TableContainer>
//     );
// };

// export default FoodTable;



// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { FOOD_DATA } from './foodData';

// const FoodTable = ({ category }) => {
//     const categoryData = FOOD_DATA[category] || [];

//     return (
//         <TableContainer component={Paper}>
//         <Table>
//             <TableHead>
//             <TableRow>
//                 <TableCell>{category === 'meat' ? '肉類' : '穀類'}</TableCell>
//                 <TableCell>カロリー</TableCell>
//                 <TableCell>タンパク質</TableCell>
//                 <TableCell>カリウム</TableCell>
//                 <TableCell>リン</TableCell>
//                 <TableCell>食塩相当量</TableCell>
//             </TableRow>
//             </TableHead>
//             <TableBody>
//             {categoryData.map((row, index) => (
//                 <TableRow key={index}>
//                 <TableCell>{row.type}</TableCell>
//                 <TableCell>{row.calories}</TableCell>
//                 <TableCell>{row.protein}</TableCell>
//                 <TableCell>{row.potassium}</TableCell>
//                 <TableCell>{row.phosphorus}</TableCell>
//                 <TableCell>{row.salt}</TableCell>
//                 </TableRow>
//             ))}
//             </TableBody>
//         </Table>
//         </TableContainer>
//     );
// };

// export default FoodTable;




// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
//     return (
//         <TableContainer component={Paper}>
//         <Table>
//             <TableHead>
//             <TableRow>
//                 <TableCell>肉類</TableCell>
//                 <TableCell>カロリー</TableCell>
//                 <TableCell>タンパク質</TableCell>
//                 <TableCell>カリウム</TableCell>
//                 <TableCell>リン</TableCell>
//                 <TableCell>食塩相当量</TableCell>
//             </TableRow>
//             </TableHead>
//             <TableBody>
//             {MEAT_DATA.map((row, index) => (
//                 <TableRow key={index}>
//                 <TableCell>{row.type}</TableCell>
//                 <TableCell>{row.calories}</TableCell>
//                 <TableCell>{row.protein}</TableCell>
//                 <TableCell>{row.potassium}</TableCell>
//                 <TableCell>{row.phosphorus}</TableCell>
//                 <TableCell>{row.salt}</TableCell>
//                 </TableRow>
//             ))}
//             </TableBody>
//         </Table>
//         </TableContainer>
//     );
// };

// export default MeatTable;
