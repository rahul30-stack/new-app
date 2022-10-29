import React,{ useState } from "react";
import data from '../data';
import Card from './Card';
import './Dropdown.css';

const Property = () => {
  const [item, setItem] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const filterBySearch = (e) => {
    e.preventDefault();
    const searchParam = searchValue.toLowerCase();
    const result = data.filter((item) => {
      return item.Location.toLowerCase().includes(searchParam) || item.Property.toLowerCase().includes(searchParam);
    })
    setItem(result);
  }
  const Dropdown = () => {

    const filterResult = (catItem) => {
      const result = data.filter((location) => {
        return location.Location === catItem;
      })
      setItem(result);
    }

    const filterByPrice = (catItem) => {
      
      catItem = catItem.split("-");
      const result = data.filter((item) => {
        return parseInt(item.Price) <= parseInt(catItem[1]) && parseInt(item.Price) >= parseInt(catItem[0]);
      })
      console.log('res', result);
      setItem(result);
    }

    return (
      <div>
        <nav>
          <ul>
            <li class="sub-menu-parent" tab-index="0">
              <a href="">Locations</a>
              <ul class="sub-menu">
                <li><button onClick={() => filterResult('USA')}>USA</button></li>
                <li><button onClick={() => filterResult('German')} >German</button></li>
                <li><button onClick={() => filterResult('Edinburgh')}>Edinburgh</button></li>
                <li><button onClick={() => filterResult('California')}>California</button></li>
                <li><button onClick={() => setItem(data)}>All</button></li>
              </ul>
            </li>
            <li class="sub-menu-parent" tab-index="0">
              <a href="#">Price</a>
              <ul class="sub-menu">
                <li><button onClick={() => filterByPrice('1-1000')}>less or equal 1000</button></li>
                <li><button onClick={() => filterByPrice('5000-12000')}>greater 5000</button></li>
                <li><button onClick={() => setItem(data)}>All</button></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    )
  };

  return (
    <>
      <div className="search">
        <form onSubmit={filterBySearch}>
          <input type="text" name="search" placeholder="Search With SearchBar(Location,Property type)" className="searchTerm" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <button className="btn" type="submit">Search</button>
        </form>
      </div>
      <Dropdown />
      <div className="stock-container">
        
        <Card item={item} />
      </div>
    </>
  )
};
export default Property;
