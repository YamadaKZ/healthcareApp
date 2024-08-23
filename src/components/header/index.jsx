import React from "react"
import "./index.scss"


const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src="" alt="Hermes" />
            </div>
            <h1 className="title">Hermes</h1>
            <button>Blog</button>
            <button>Article</button>
            <button>Home</button>
            <button>Health</button>
            <button>Dashboard</button>
        </div>
    )
}

export default Header;