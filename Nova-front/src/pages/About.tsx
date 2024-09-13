import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { aboutlinks } from "../tools/aboutlinks";

interface AboutProps{
    id:number;
    heading:string;
    component: React.ComponentType;
}

function About({ id, heading, component: Component }:AboutProps):JSX.Element{
    return(
        <section className="about">
            <h1>{heading}</h1>
            <div className="container">
                <aside>
                    <ul>
                        {aboutlinks.map((link) => (
                        <li key={link.id} className={id === link.id ? "active" : ""}>
                            <Link to={link.path}><FontAwesomeIcon icon={faCaretRight} /> {link.heading}</Link>
                        </li>
                        ))}
                    </ul>
                </aside>
                <main>
                    <Component />
                </main>
            </div>

        </section>
    )
}

export default About;
