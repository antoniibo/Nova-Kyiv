import React, { useEffect, useState } from "react";
import { fetchCategoryData, DataItem } from "../api/api";
import { Prev } from "../tools/preview";
import './CSS/general.css';
import { useLocation, useNavigate } from "react-router-dom"; 
import Filter from '../tools/filter';
import Checkbox from "../tools/checkbox";
import { conection } from "../tools/conections";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

interface SearchPageProps {
  categories?: number[];
  setCategories?: (categories: number[]) => void;
}

function SearchPage({ categories: propCategories = [], setCategories }: SearchPageProps): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [allData, setAllData] = useState<DataItem[]>([]);
  const [categories, setLocalCategories] = useState<number[]>(propCategories);
  const [filter, setFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    const stateCategories = location.state?.categories || [];
    if (stateCategories.length > 0) {
      setLocalCategories(stateCategories);
    }
  }, [location.state]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialFilter = searchParams.get('filter');

    switch (initialFilter) {
      case 'priceAsc':
        setFilter(1);
        break;
      case 'priceDesc':
        setFilter(2);
        break;
      case 'alphabet':
        setFilter(3);
        break;
      case 'new':
        setFilter(4);
        break;
      default:
        setFilter(0);
        break;
    }
  }, [location.search]);

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        let categoriesToFetch = categories;
        if (categories.length === 0 || categories.length === 5) {
          categoriesToFetch = [0, 1, 2, 3, 4]; 
        }
        const dataPromises = categoriesToFetch.map(category => fetchCategoryData(category));
        const data = await Promise.all(dataPromises);
        setAllData(data.flat());
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    getCategoryData();
  }, [categories]);

  const handleCheckboxChange = (category: number) => {
    const updatedCategories = categories.includes(category)
      ? categories.filter(c => c !== category)
      : [...categories, category];
    setLocalCategories(updatedCategories);
    if (setCategories) {
      setCategories(updatedCategories);
    }
  };

  const handleFilterChange = (selectedFilter: number) => {
    setFilter(selectedFilter);
    let filterQuery = '';
    switch (selectedFilter) {
      case 1:
        filterQuery = 'priceAsc';
        break;
      case 2:
        filterQuery = 'priceDesc';
        break;
      case 3:
        filterQuery = 'alphabet';
        break;
      case 4:
        filterQuery = 'new';
        break;
      default:
        filterQuery = 'popular';
        break;
    }
    navigate(`/search?filter=${filterQuery}`);
  };

  const sortData = (data: DataItem[]) => {
    switch (filter) {
      case 1:
        return data.sort((a, b) => a.price - b.price);
      case 2:
        return data.sort((a, b) => b.price - a.price);
      case 3:
        return data.sort((a, b) => a.header.localeCompare(b.header));
      case 4:
        return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 0:
      default:
        return data.sort((a, b) => (b.popular ? 1 : -1));
    }
  };

  const filterDataByName = (data: DataItem[]) => {
    return data.filter(item => item.header.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const sortedData = sortData(allData);
  const filteredData = filterDataByName(sortedData);

  const toogleMenu = ()=>{
    setIsMenuVisible(prevState => !prevState);
  }

  return (
    <section className="category">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Пошук..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="sorters">
        <button className="sorter-categories" onClick={toogleMenu}><FontAwesomeIcon icon={faSliders} /> Категорії</button>
        <Filter onFilterChange={handleFilterChange} currentFilter={filter} />
      </div>
      <div className="category-content" >
        <aside className={`seach-aside ${isMenuVisible? "open" : ""}`}>
          <form>
            {conection.map((index)=>(
              <Checkbox
              key={index.category}
              id={index.category}
              name={index.name}
              value={index.category}
              checked={categories.includes(index.category)}
              label={index.name}
              onChange={() => handleCheckboxChange(index.category)}
              />
            ))}
          </form>
        </aside>
        <main>
        {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Prev
                key={item.id}
                id={item.id}
                category={item.category}
                photos={item.photos}
                header={item.header}
                price={item.price}
              />
            ))
          ) : (
            <p className="search-null">Схоже, нічого не було знайдено</p>
          )}
        </main>
      </div>
    </section>
  );
}

export default SearchPage;