import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataById, DataItem } from '../api/api';
import Counter from "../tools/counter";
import { useCart } from "../Context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import Callback from "../tools/callback";
import config from '../config';
import './CSS/item.css';


function Item() {
    const { id, size: urlSize } = useParams<{ id: string; size?: string }>();
    const navigate = useNavigate();
    const [item, setItem] = useState<DataItem | null>(null);
    const [mainPhoto, setMainPhoto] = useState<string>('');
    const [activePhoto, setActivePhoto] = useState<string>('');
    const [activeSize, setActiveSize] = useState<string>('');
    const [resetCount, setResetCount] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1)
    const { addItem } = useCart();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const data = await fetchDataById(Number(id));
                setItem(data);
                if (data.photos.length > 0) {
                    setMainPhoto(data.photos[0]);
                    setActivePhoto(data.photos[0]);
                }
                if (data.size) {
                    const defaultSize = data.size.R ? 'R' : Object.keys(data.size)[0];
                    setActiveSize(urlSize || defaultSize);
                    if (!urlSize) {
                        navigate(`/style/${id}?size=${defaultSize}`, { replace: true });
                    }
                }
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchItem();
    }, [id, urlSize, navigate]);

    const handlePhotoClick = (photo: string) => {
        setMainPhoto(photo);
        setActivePhoto(photo);
    };

    const handleSizeClick = (size: string) => {
        setActiveSize(size);
        setResetCount(true);
        navigate(`/style/${id}?size=${size}`);
    };

    const handleResetComplete = () => {
        setResetCount(false);
    };

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        if (item && activeSize) {
            addItem({ id: item.id, size: { [activeSize]: { remainder: quantity } }, cartId: `${item.id}${activeSize}` });
        }
    };


    if (!item) {
        return <div className="loading"><p className="search-null">Loading...</p></div>;
    }

    return (
        <section className="item">
            <main>
                <div className="item-photos">
                    <div className="side-photos">
                        {item.photos.map((photo, index) => (
                            <div 
                                className={`unit-side-photo ${photo === activePhoto ? 'active' : ''}`} 
                                key={index}
                                onClick={() => handlePhotoClick(photo)}
                            >
                                <img src={`${config.BASE_URL}images/${photo}`} alt={`side-photo-${index+1}`} />
                            </div>
                        ))}
                    </div>
                    <div className="main-photo">
                        <img src={`${config.BASE_URL}images/${mainPhoto}`} alt="photo-item" />
                    </div>
                </div>
            </main>
            <aside>
                <div className="aside-container">
                    <h1>{item.header}</h1>
                    <p className="article">Артикул: {item.id}</p>
                    <p className="price">{item.price} ₴</p>
                        
                    <div className="size">
                        <p><b>Розмір:</b></p>
                        <div className="size-options">
                            {Object.keys(item.size).map((size) => (
                                <button 
                                    key={size} 
                                    className={size === activeSize ? 'active' : ''} 
                                    onClick={() => handleSizeClick(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    {activeSize && item.size[activeSize].remainder > 0 ? (
                        <div className="buy-buttons">
                            <Counter 
                                maxCount={item.size[activeSize].remainder}
                                resetCount={resetCount}
                                onResetComplete={handleResetComplete}
                                quantity={quantity}
                                onQuantityChange={handleQuantityChange}
                            />
                            <button className="to-cart" onClick={handleAddToCart}>У КОШИК</button>
                        </div>
                    ) : (
                        <Callback id={item.id} size={activeSize}/>
                    )}
                    <div className="description">
                        <details>
                            <summary><FontAwesomeIcon icon={faCaretRight} className="more-svg"/> Опис</summary>
                            <div className="full-char">
                                <p>{item.desc}</p>
                            </div>
                        </details>
                        <details>
                            <summary><FontAwesomeIcon icon={faCaretRight} className="more-svg"/> Характеристика</summary>
                            <div className="full-char">
                                {item.addstaff.map((staff, index) => (
                                    <p key={index}>{staff}</p>
                                ))}
                            </div>
                        </details>
                    </div>
                </div>
            </aside>
        </section>
    );
}

export default Item;

