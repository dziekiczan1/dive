import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPostsBySearch } from "../../actions/posts";

import decode from "jwt-decode";
import divelogo from "../../images/logo2.png";
import Menu from "./menuArray";
import "./Navbar.scss";

const ListItem = ({ isActive, onClick, icon, name, link }) => {
  const className = `list${isActive ? " active" : ""}`;

  return (
    <li onClick={onClick} className={className}>
      <Link to={`/${link}`}>
        <span className="app__navigation-icon">
          <ion-icon name={icon} />
        </span>
        <span className="app__navigation-text">
          {name} {isActive ? "" : ""}
        </span>
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const isAdmin = user?.result?.admin === true;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/home");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const [activeElem, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [searchField, setSearchField] = useState(false);
  const [search, setSearch] = useState("");
  const toggle = () => setSearchField(!searchField);
  const toggling = () => setIsOpen(!isOpen);

  const handleToggle = (newValue) => {
    setActive(newValue);
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      console.log("nacisnales");
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      navigate(`/posts/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/spots");
    }
  };

  return (
    <>
      <nav className="app__navigation">
        <div className="app__navigation-background">
          <ul>
            {Menu.map((item) => (
              <ListItem
                key={item.name}
                isActive={activeElem === item.name}
                onClick={() => handleToggle(item.name)}
                icon={item.icon}
                name={item.name}
                link={item.link}
              />
            ))}
            <div className="app__navigation-indicator"></div>
          </ul>
          <div className="navigation__search">
            <div className="search__icon" onClick={toggle}>
              <ion-icon name="search-outline"></ion-icon>
            </div>
            {searchField && (
              <motion.div
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <div className="search__input">
                  <input
                    name="search"
                    type="search"
                    label="Search"
                    className="search__textarea"
                    onKeyPress={handleKeyPress}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="search-button" onClick={searchPost}>
                    Search
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <div className="app__navigation-user">
          {user ? (
            <>
              <div className="app__navigation-user-welcome">
                <p className="bold-text">Welcome, {user.result.name}</p>
              </div>
              <div className="app__navigation-user-button">
                <button className="logout" onClick={logout}>
                  Logout
                </button>
              </div>
              {isAdmin && (
                <>
                  <Link to={`/admin`}>
                    <button className="admin">Admin</button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <div className="app__navigation-user-button">
                <Link to={`/login`}>
                  <button className="signin">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="signin-text">Sign In</span>
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="logo">
          <img src={divelogo} alt="WhereTo?Dive!" />
        </div>
      </nav>

      <div className="app__navmobile-menu">
        <div className="menu-icon">
          <ion-icon
            name={isOpen ? "close-outline" : "menu-outline"}
            onClick={toggling}
          />
        </div>
        {isOpen && (
          <motion.div
            whileInView={{ x: [-100, 0] }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="side-bar"
          >
            <ul>
              {Menu.map((item) => (
                <li key={item.name}>
                  <Link to={`/${item.link}`} onClick={toggling}>
                    {item.name}
                  </Link>
                </li>
              ))}
              {user ? (
                <>
                  <div className="app__navigation-user-button">
                    <div onClick={toggling}>
                      <button className="logout" onClick={logout}>
                        Logout
                      </button>
                    </div>
                    {isAdmin && (
                      <>
                        <Link to={`/admin`}>
                          <button className="admin" onClick={toggling}>
                            Admin
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="app__navigation-user-button">
                    <Link to={`/login`}>
                      <button className="signin" onClick={toggling}>
                        <span className="circle" aria-hidden="true">
                          <span className="icon arrow"></span>
                        </span>
                        <span className="signin-text">Sign In</span>
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Navbar;
