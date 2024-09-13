import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';

interface FilterProps {
  onFilterChange: (filter: number) => void;
  currentFilter: number; 
}

const Filter = ({ onFilterChange, currentFilter }: FilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState(currentFilter);
  const filterNames = ["За популярністю", "Від дешевшого", "Від дорожчого", "За назвою", "За датою"];
  const detailsRef = useRef<HTMLDetailsElement>(null); 

  useEffect(() => {
    setSelectedFilter(currentFilter); 
  }, [currentFilter]);

  const handleFilterClick = (filter: number) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  return (
    <div className="filter-box">
      <p>Сортування:</p>
      <details className="filter" ref={detailsRef}>
        <summary><FontAwesomeIcon icon={faArrowsUpDown} /> {filterNames[selectedFilter]}</summary>
        <ul>
          {filterNames.map((name, index) => (
            <li key={index} onClick={() => handleFilterClick(index)}>{name}</li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default Filter;