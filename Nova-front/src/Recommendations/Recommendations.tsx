import React, { useState, useEffect } from "react";
import { Prev } from "../tools/preview";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Recommendations.css';
import { fetchSortedData, fetchPopularData, DataItem } from '../api/api';

// import config from '../config';

function Recommendations() {
    const [sortedData, setSortedData] = useState<DataItem[]>([]);
    const [firstItemsByCategory, setFirstItemsByCategory] = useState<DataItem[]>([]);

    useEffect(() => {
        const getSortedData = async () => {
            try {
                const data = await fetchSortedData();
                setSortedData(data);
            } catch (error) {
                console.error("Error fetching sorted data:", error);
            }
        };

        const getPopularData = async () => {
            try {
                const data = await fetchPopularData();
                setFirstItemsByCategory(data);
            } catch (error) {
                console.error("Error fetching popular data:", error);
            }
        };

        getSortedData();
        getPopularData();
    }, []);

    return (
        <section className="recommendations">
            <div className="sub-section">
                <h2>Нові крутики</h2>
                <p><Link to='/search?filter=new'>Ще <span className="to-hide">більше </span><FontAwesomeIcon icon={faArrowRight} className="svg-linker"/></Link></p>
                <div className="items">
                    {sortedData.map((item) => (
                        <Prev
                            key={item.id}
                            id={item.id}
                            category={item.category}
                            photos={item.photos}
                            header={item.header}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>
            <div className="sub-section">
                <h2>Попитні штучки</h2>
                <p><Link to='/search?filter=popular'>Ще <span className="to-hide">більше </span><FontAwesomeIcon icon={faArrowRight} className="svg-linker"/></Link></p>
                <div className="items">
                    {firstItemsByCategory.map((item) => (
                        <Prev
                        key={item.id}
                        id={item.id}
                        category={item.category}
                        photos={item.photos}
                        header={item.header}
                        price={item.price}
                    />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Recommendations;