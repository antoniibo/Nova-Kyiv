import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategoryData, DataItem } from "../api/api";
import { Prev } from "../tools/preview";
import { conection } from "../tools/conections";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import './CSS/general.css';


interface ShopCategoryProps {
  category: number;
  heading: string;
}

function ShopCategory({ category, heading }: ShopCategoryProps): JSX.Element {
   
    const [allData, setAllData] = useState<DataItem[]>([]);
   
  
    useEffect(() => {
      const getCategoryData = async () => {
        try {
          const data = await fetchCategoryData(category);
          setAllData(data);
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      };
      getCategoryData();
    }, [category]);
  
    return (
      <section className="category">
        <h1>{heading}</h1>
        <div className="category-content">
          <aside className="category-aside">
            <ul>
              {conection.map((link, index) => (
                <li key={index} className={category === link.category ? "active" : ""}>
                    <Link to={link.path}><FontAwesomeIcon icon={faCaretRight} /> {link.name}</Link>
                </li>
              ))}
            </ul>
          </aside>
          <main>
            {allData.map((item) => (
              <Prev
                key={item.id}
                id={item.id}
                category={item.category}
                photos={item.photos}
                header={item.header}
                price={item.price}
              />
            ))}
          </main>
        </div>
      </section>
    );
  }
  
  export default ShopCategory;