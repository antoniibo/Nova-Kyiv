import React from "react";
import Newssub from '../tools/newssub';
import { Link } from "react-router-dom";
import { aboutlinks } from "../tools/aboutlinks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone,faEnvelope,faLocationDot } from '@fortawesome/free-solid-svg-icons'
import {faInstagram,faFacebook,faViber,faTelegram,faCcMastercard,faCcVisa} from '@fortawesome/free-brands-svg-icons'
import logo from '../assets/logo2.png'
import './Footer.css'

function Footer(){
    return(
        <footer>
            <Newssub/>
            <div className="fisrt-row">
                <div className="logo-footer">
                    <Link to='/'><img src={logo} alt="big logo" /></Link>
                    <ul className="social">
                        <li><a href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href=""><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li><a href=""><FontAwesomeIcon icon={faViber} /></a></li>
                        <li><a href=""><FontAwesomeIcon icon={faTelegram} /></a></li>
                    </ul>
                </div>
                <div className="information">
                    <h4>Інформація</h4>
                    <ul>
                        {aboutlinks.map((link)=>(
                            <li key={link.id}><Link to={link.path}>{link.heading}</Link></li>
                        ))}
                    </ul>
                </div>
                <div className="contacts">
                    <h4>Контакти</h4>
                    <ul>
                        <li><FontAwesomeIcon icon={faPhone} /> <a href="tel:+380000000">+380000000</a></li>
                        <li><FontAwesomeIcon icon={faPhone} /> <a href="tel:+380000000">+380000000</a></li>
                        <li><FontAwesomeIcon icon={faEnvelope} /> <a href="support@novakyiv.com">support@novakyiv.com</a></li>
                        <li><FontAwesomeIcon icon={faLocationDot} /> <a href="https://maps.app.goo.gl/yQockw18PyYt5Byb9">Вулиця Миколи Лисенка, 5-1, Київ, 02000</a></li>
                    </ul>
                </div>
                <div className="schedule">
                    <h4>Графік роботи</h4>
                    <ul>
                        <li>Будні: з 10:00 до 19:00</li>
                        <li>Вихідні: з 11:00 до 18:00</li>
                        <li>Свята: з 11:30 до 18:00</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="second-row">
                <p>Designed and developed by <a href="https://antonii-bondar.com/">Antonii Bondar</a></p>
                <ul>
                    <li><FontAwesomeIcon icon={faCcVisa} /></li>
                    <li><FontAwesomeIcon icon={faCcMastercard} /></li>
                </ul>
                <p className="copyright">All right reserved 2024.</p>
            </div>
        </footer>
    )
}

export default Footer;