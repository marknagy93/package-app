import React, { useState } from "react";
import './home.css';
import { Link } from "react-router-dom";

// Home felület
const Home = () => {

    
    return (
            <div className="home">
                <h1>Üdvözöljük!</h1>
                <div className="links">
                    <Link className="link" style={{textDecoration: 'none', color: 'white', margin: 5}} to="/userlogin">
                        Belépés ügyfélként
                    </Link>
                    <Link className="link" style={{textDecoration: 'none', color: 'white', margin: 5}} to='/adminlogin'>
                        Belépés futárként
                    </Link>
                </div>
            </div>
    )
}
export default Home;