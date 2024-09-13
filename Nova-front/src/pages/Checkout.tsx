import React ,{useState, useEffect}from "react";
import './CSS/checkout.css';
import { Link } from "react-router-dom";
import logo from '../assets/logo2.png';
import {CartItem } from "../CartMemory/cartArray";
import { DataItem, fetchDataById } from "../api/api";
import photo from "../assets/card.webp"
import config from "../config";
import { useContext } from "react";
import { useCart } from "../Context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'


interface CartItemWithDetails extends CartItem, DataItem {
    quantity: number;
    sizeCart: string;
}

function Checkout() {
    const { cartItems } = useCart();
    const [fetchedItems, setFetchedItems] = useState<CartItemWithDetails[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const items: CartItemWithDetails[] = await Promise.all(
                cartItems.map(async (cartItem) => {
                    const data = await fetchDataById(cartItem.id);
                    const sizeKey = Object.keys(cartItem.size)[0];
                    const quantity = cartItem.size[sizeKey].remainder;
                    return { ...cartItem, ...data, quantity, sizeCart: sizeKey };
                })
            );
            setFetchedItems(items);
        };

        fetchCartItems();
    }, [cartItems]);

    const [deliveryMethod, setDeliveryMethod] = useState<string>('');

    const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryMethod(event.target.value);
    };

    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
      const today = new Date();
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(today.getDate() + 7);

      const formatDate = (date:Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      setMinDate(formatDate(today));
      setMaxDate(formatDate(sevenDaysLater));
    }, []);

    const handleSummaryClick = (element: string) => (event: React.MouseEvent<HTMLElement>) => {
      const radio = document.getElementById(element) as HTMLInputElement;
      if (radio) {
        radio.checked = true;
      }
    };


    return (
        <>
            <div className="checkout-header">
                <div className="logo">
                    <Link to='/'><img src={logo} alt="logo" /></Link>
                </div>
            </div>
            <div className="checkout-box">
                <main>
                    <h1>Оформлення замовлення</h1>
                    <section className="checkout-contact">
                        <form action="">
                            <h3>Контактна інформація:</h3>
                            <div className="input-box">
                                <div className="full-row">
                                    <input type="email" placeholder="Електронна пошта" id="cc1" required />
                                    <input type="tel" placeholder="Номер телефону" id="cc2" required />
                                </div>
                                <div className="share-row">
                                    <input type="text" placeholder="Ім'я" id="cc3" required />
                                    <input type="text" placeholder="Прізвище" id="cc4" required />
                                </div>
                            </div>
                        </form>
                    </section>

                    <section className="receiver">
                        <form action="">
                            <h3>Одержувач:</h3>
                            <div className="input-box">
                                <div className="share-row">
                                    <input type="text" placeholder="Ім'я" id="delivery-name" required />
                                    <input type="text" placeholder="Прізвище" id="delivery-surn" required />
                                </div>
                                <div className="full-row">
                                <input type="text" placeholder="Компанія (необов'язково)" id="company" />
                                </div>
                            </div>
                        </form>
                    </section>

                    <section className="receive-type">
                        <form action="">
                            <h3>Метод доставки:</h3>
                            <ul>
                                <li>
                                    <input type="radio" name="delivery-method" id="courier" value="courier" onChange={handleDeliveryChange} />
                                    <label htmlFor="courier">Міжнародна <span className="dprice">від 1000 ₴</span></label>
                                </li>
                                <li>
                                    <input type="radio" name="delivery-method" id="nova-p" value="nova-p" onChange={handleDeliveryChange} />
                                    <label htmlFor="nova-p">Нова пошта <span className="dprice">від 50 ₴</span></label>
                                </li>
                                <li>
                                    <input type="radio" name="delivery-method" id="uki-p" value="uki-p" onChange={handleDeliveryChange} />
                                    <label htmlFor="uki-p">Укрпошта <span className="dprice">від 40 ₴</span></label>
                                </li>
                                <li>
                                    <input type="radio" name="delivery-method" id="self" value="self" onChange={handleDeliveryChange} />
                                    <label htmlFor="self">Самовивіз <span className="dprice">безкоштовно</span></label>
                                </li>
                             </ul>   
                        </form>
                    </section>

                    {deliveryMethod && (
                        <>
                            <section className="to-receive">
                                <form action="">
                                    {deliveryMethod === 'courier' ? (
                                        <>
                                            <h3>Адреса:</h3>
                                            <div className="input-box">
                                                <div className="full-row">
                                                    <input type="text" placeholder="Країна" required />
                                                    <input type="text" placeholder="Вулиця / Проспект" id="street" required />
                                                </div>
                                                <div className="share-row">
                                                    <input type="text" placeholder="Номер будинку" id="nobuilding" required />
                                                    <input type="text" placeholder="Квартира (за потреби)" id="unit" />
                                                </div>
                                                <div className="share-row">
                                                    <input type="text" placeholder="Місто" id="city" required />
                                                    <input type="text" placeholder="Поштовий індекс" id="index" required />
                                                </div>
                                            </div>
                                        </>
                                    ) : null}
                                    {deliveryMethod === 'nova-p' || deliveryMethod === 'uki-p' ? (
                                        <>
                                            <h3>Пошта:</h3>
                                            <div className="share-row">
                                                <input type="text" placeholder="Номер відділення" id="nopost" />
                                                <input type="text" placeholder="Місто" id="postcity" />
                                            </div>
                                        </>
                                    ) : null}

                                    {deliveryMethod === 'self' && (
                                        <>
                                            <h3>Фізичний магазин:</h3>
                                            <label htmlFor="receiving-date">Дата отримання:</label>
                                            <input type="date" id="receiving-date" min={minDate} max={maxDate}/>
                                            <p >Отримання здійснюється за адресою:
                                                <a href="https://maps.app.goo.gl/yQockw18PyYt5Byb9">
                                                    <b>Вулиця Миколи Лисенка, 5-1, Київ, 02000</b>
                                                </a>
                                            </p>
                                            <p>Будь ласка, враховуйте те, що самовивозом можна отримати протягом тижня після оформлення замовлення, інакше операція буде вважатися відхиленою</p>
                                            {/* <input type="checkbox" id="agreement"/>
                                            <label htmlFor="agreement"> ознайомлений і погоджуюся з цими умовам</label> */}
                                        </>
                                    )}
                                </form>
                            </section>

                            <section className="payment">
                                <details>
                                    <summary onClick={handleSummaryClick("card")}><FontAwesomeIcon icon={faCaretRight} className="more-svg"/> Оплата карткою: <span className="right"><input type="radio" id="card"/></span></summary>
                                    <form action="">
                                    <div className="input-box">
                                        <input type="text" placeholder="Номер картки" id="nocard" required />
                                        <div className="share-row">
                                        <input type="text" placeholder="Дійсний до MM/YY" id="expiry" required />
                                        
                                        <input type="text" placeholder="Код безпеки CVV" id="cvv" required />
                                        </div>
                                        <input type="text" placeholder="Ім'я власника картки" required />
                                        </div>
                                    </form>
                                </details>

                                <details>
                                    <summary onClick={handleSummaryClick("props")}><FontAwesomeIcon icon={faCaretRight} className="more-svg"/> За реквізитами: <span className="right"><input type="radio" id="props"/></span></summary>
                                    <form action="">
                                        <div className="input-box">
                                            <p>Інструкцію щодо оплати та данні замовлення будуть надіслані на пошту після перевірки замовлення.</p>
                                            <p>Будь ласка, враховуйте те, що операція буде вважатися відхиленою, якщо товар не буде сплачений протягом двох діб після оформлення замовлення.</p>
                                        </div>
                                    </form>
                                </details>

                                {deliveryMethod === 'self' && (
                                    <details>
                                        <summary onClick={handleSummaryClick("cash")}><FontAwesomeIcon icon={faCaretRight} className="more-svg"/> Готівкою: <span className="right"><input type="radio" id="cash"/></span></summary>
                                        <form action="">
                                            <div className="input-box">
                                                <ul>
                                                    <li>
                                                        <p>Ви можете сплатити замовлення у нашому магазині при отриманні товару</p>
                                                    </li>
                                                    <li>
                                                        <input type="checkbox" id="agreement"/>
                                                        <label htmlFor="agreement"> ознайомлений і погоджуюся з умовам</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </form>
                                    </details>
                                )}
                                <div className="pay">
                                    <button>Замовити • {fetchedItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 300} ₴</button>
                                </div>
                            </section>
                        </>
                    )}
                </main>
                <aside>
                    <div className="checkout-items">
                        {/* {cartItems.map((cartItem, index) => (
                            <div className="cart-item" key={index}>
                                <div className="cart-photo">
                                    <img src={`${config.BASE_URL}images/${cartItem.photos[0]}`} alt="item image" />
                                </div>
                                <div className="cart-desc">
                                    <h3>{cartItem.header}</h3>
                                    <p>{cartItem.price} ₴</p>
                                    <p>{cartItem.sizeCart}</p>
                                </div>
                            </div>
                        ))} */}
                        {fetchedItems.map((cartItem, index) => (
                            <div className="cart-item" key={index}>
                                <div className="cart-photo">
                                    <img src={`${config.BASE_URL}images/${cartItem.photos[0]}`} alt="item image" />
                                </div>
                                <div className="cart-desc">
                                    <h3>{cartItem.header}</h3>
                                    <ul>
                                        <p>Ціна: {cartItem.price} ₴</p>
                                        <p>Розмір: {cartItem.sizeCart}</p>
                                        <p>Кількість: {cartItem.quantity}</p>
                                    </ul>
                                    <p>Усього: {cartItem.price * cartItem.quantity} ₴</p>
                                </div>
                            </div>
                        ))}
                         {/* <div className="cart-item" >
                                <div className="cart-photo">
                                    <img src={photo} alt="item image" />
                                </div>
                                <div className="cart-desc">
                                    <h3>Yoyoyoy</h3>
                                    <ul>
                                        <p>Ціна: 2000 ₴</p>
                                        <p>Розмір: S</p>
                                        <p>Кількість: 4</p>
                                    </ul>
                                    <p>Усього: 8000 ₴</p>
                                </div> */}
                           
                            
                            <div className="total">
                                <p className="price-checkout">Підсумок: <span className="right-ch">{fetchedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)} ₴</span></p>
                                <p className="price-checkout">Доставка: <span className="right-ch">300 ₴</span></p>
                                <p><b>До сплати: <span className="right-ch">{fetchedItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 300} ₴</span></b></p>
                            </div> 
                    </div>
                    
                </aside>
            </div>
        </>
    );
}

export default Checkout;