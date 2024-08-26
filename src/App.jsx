// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProfile } from "./features/auth/authSlice";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes/AppRoutes";
import { useInitialFetch } from "./hooks/useInitialFetch";
import "./App.css"

const App = () => {
  const profile = useSelector(selectProfile);
  useInitialFetch();

  return (
    <Router>
      {profile?.nickName ? (
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      ) : (
        <AppRoutes />
      )}
    </Router>
  );



};

export default App;


// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import AppRoutes from "./routes/AppRoutes";
// import { useInitialFetch } from "./hooks/useInitialFetch";

// const App = () => {
//   useInitialFetch();  // アプリケーション全体で一度だけデータをフェッチ

//   return (
//     <Router>
//       <MainLayout>
//         <AppRoutes />
//       </MainLayout>
//     </Router>
//   );
// };

// export default App;


// App.jsx
// import './App.css';
// import Core from './features/core/Core';

// const App = () => {
//   return (
//     <div>
//       < Core/>
//     </div>
//   );
// };

// export default App;
