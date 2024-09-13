import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { conection } from "../tools/conections";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight,faMagnifyingGlass,faBagShopping,faBars,faXmark } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../Context/Context';
import Cart from "../Cart/Cart";
import logo from '../assets/logo2.png';
import './Header.css';
import { aboutlinks } from "../tools/aboutlinks";
import { languages } from "../tools/languages";

function Header() {
    const [menu, setMenu] = useState("home");
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { cartItems } = useCart();
    const [cartItemCount, setCartItemCount] = useState(0);
    const [bounce, setBounce] = useState(false);
    useEffect(() => {
        const newItemCount = cartItems.reduce((total, item) => {
            const sizeKey = Object.keys(item.size)[0];
            return total + item.size[sizeKey].remainder;
        }, 0);

        if (newItemCount !== cartItemCount) {
            setBounce(true);
            setCartItemCount(newItemCount);
        }

        const timeout = setTimeout(() => {
            setBounce(false);
        }, 800);

        return () => clearTimeout(timeout);
    }, [cartItems, cartItemCount]);

    const toogleMenu = ()=>{
        setIsMenuVisible(prevState => !prevState);
        setIsCartVisible(false)
    }
    const toggleCart = () => {
        setIsCartVisible(prevState => !prevState);
        setIsMenuVisible(false)
    };

    return (
        <>
            <header>
                <nav>
                    <button className="burger-menu" onClick={toogleMenu}><FontAwesomeIcon icon={faBars} /></button>
                    <div className={`cart-backdrop ${isMenuVisible ? "open" : ""}`} onClick={toogleMenu}></div>
                    <div className={`left ${isMenuVisible? "open" : ""}`}>
                        <div className="menu">
                            <button onClick={toogleMenu}><FontAwesomeIcon icon={faXmark} /></button>
                            <h3>Меню</h3>
                        </div>
                        <ul className="nav-categories">
                            {conection.map((link, index) => (
                                <li key={index} onClick={() => setMenu(link.name.toLowerCase())}>
                                    <Link to={link.path} >{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                        <ul className="p-info">
                            {aboutlinks.map((link) => (
                                <li key={link.id}>
                                    <Link to={link.path}>{link.heading}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="p-lang">
                            {languages.map((link) => (
                                <a href={link.path} key={link.id}>
                                        {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="logo">
                        <Link to='/'>
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <ul className="right">
                        <li>
                            <details className="lang-wide">
                                <summary><FontAwesomeIcon icon={faCaretRight} className="more-svg"/> {languages[0].name}</summary>
                                {languages.map((link) => (
                                    <a href={link.path} key={link.id}>
                                        {link.name}
                                    </a>
                                ))}
                            </details>
                        </li>
                        <li onClick={() => setMenu("search")}>
                            <Link to='/search'><FontAwesomeIcon icon={faMagnifyingGlass} className="search-svg" /> <span className="disappear">Пошук</span></Link>
                        </li>
                        <li onClick={toggleCart}>
                            <FontAwesomeIcon icon={faBagShopping} className="cart-svg" /> <span className="disappear">Кошик </span>
                            <span className={`cart-counter ${bounce ? 'bounce' : ''}`}>
                                <b>{cartItemCount > 9 ? '+' : cartItemCount}</b>
                            </span>
                        </li>
                    </ul>
                </nav>
            </header>
            <Cart isVisible={isCartVisible} toggleVisibility={toggleCart} />
        </>
    );
}

export default Header;
