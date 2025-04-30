import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/?search=${searchInput}`); // Pass the search keyword as a query parameter
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://th.bing.com/th/id/R.e116e7eba13c7ad3264bcaab92438d14?rik=1bDK3EYRoEiRpw&riu=http%3a%2f%2fclipart-library.com%2fimg%2f862842.png&ehk=C3gXt%2bhb1XM7MhLuicguu8c%2f50hiuWn05ARKueOBp60%3d&risl=&pid=ImgRaw&r=0"
        />
      </Link>

      <div className="header__search">
        <input
          className="header__searchInput"
          type="text"
          placeholder="Search here..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchIcon className="header__searchIcon" onClick={handleSearch} />
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        
        <Link to='/collab'>
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Collab</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
