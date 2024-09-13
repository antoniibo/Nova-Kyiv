import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import config from '../config';
import { conection } from "./conections"; 

// For items preview
interface PrevProps {
    id: number;
    category: number;
    photos: string[];
    header: string;
    price: number;
}

export const Prev: React.FC<PrevProps> = memo(({ id, category, photos, header, price }) => {
    const [mainPhoto, setMainPhoto] = useState(photos[0]);
    const [activePhoto, setActivePhoto] = useState(photos[0]);

    const handlePhotoClick = (photo: string) => {
        setMainPhoto(photo);
        setActivePhoto(photo);
    };

    const categoryPath = conection.find(item => item.category === category)?.path || '';

    return (
        <figure className="prev-box">
            <div className="prev-main">
                <Link to={`${categoryPath}/${id}`}>
                    <img src={`${config.BASE_URL}images/${mainPhoto}`} alt="item photo" />
                </Link>
            </div>
            <ul className="prev-desc">
                <li>
                    <div className="prev-item">
                        <figcaption className="prev-name">{header}</figcaption>
                        <div className="prev-alter">
                            {photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={`${config.BASE_URL}images/${photo}`}
                                    alt={`alter photo ${index + 1}`}
                                    onClick={() => handlePhotoClick(photo)}
                                    className={activePhoto === photo ? 'active' : ''}
                                    // loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                </li>
                <li>
                    <figcaption className="prev-price">{price}<span className="curency">₴</span></figcaption>
                </li>
            </ul>
        </figure>
    );
});