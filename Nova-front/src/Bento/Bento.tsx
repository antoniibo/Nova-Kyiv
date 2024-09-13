import React from "react";
import { conection } from "../tools/conections";
import { Link } from "react-router-dom";
import './Bento.css'

function Bento() {
    return (
        <section className="bento">
            <div className="first">
                {conection.slice(0, 2).map((link, index) => (
                    <div key={index} className="bento-item">
                        <Link  to={link.path} >
                        <div className="bento-text">
                            <h3>{link.name}</h3></div>
                            <img src={link.image} alt="bento photo" />
                        </Link>
                    </div>
                ))}
                
            </div>
            <div className="second">
                {conection.slice(2).map((link, index) => (
                    <div key={index} className="bento-item">
                        <Link  to={link.path} >
                        <div className="bento-text">
                            <h3>{link.name}</h3></div>
                            {/* <h3>{link.name}</h3> */}
                            <img src={link.image} alt="bento photo" />   
                        </Link>
                </div>
                ))}
            </div>
        </section>
    );
}

export default Bento;