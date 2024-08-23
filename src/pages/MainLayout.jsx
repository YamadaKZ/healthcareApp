import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const MainLayout = ({children}) => {

    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>{children}</div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default MainLayout;