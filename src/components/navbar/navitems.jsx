import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navitems.css";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import menuStyles from "./menuStyles";

function Navitems() {
  const wrapperRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleStateChange(state) {
    setMenuOpen(state.isOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function CloseOnClickOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setMenuOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  CloseOnClickOutside(wrapperRef);

  const isMobile = useMediaQuery({ maxWidth: "640px" });

  if (isMobile) {
    return (
      <div ref={wrapperRef}>
        <Menu
          right
          styles={menuStyles}
          isOpen={menuOpen}
          onStateChange={(state) => handleStateChange(state)}
        >
          <ul className="list_container">
            <li className="nav_item menu">
              <NavLink to={`/home`} onClick={() => closeMenu()}>
                Home
              </NavLink>
            </li>
            <li className="nav_item menu">
              <NavLink to={`/services`} onClick={() => closeMenu()}>
                Services
              </NavLink>
            </li>
            <li className="nav_item menu">
              <NavLink to={`/about`} onClick={() => closeMenu()}>
                About Us
              </NavLink>
            </li>
            <li className="nav_item menu">
              <NavLink to={`/portfolio`} onClick={() => closeMenu()}>
                Portfolio
              </NavLink>
            </li>
            <li className="nav_item menu">
              <NavLink to={`/contact`} onClick={() => closeMenu()}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </Menu>
      </div>
    );
  }

  return (
    <ul className="list_container">
      <li className="nav_item">
        <NavLink to={`/home`}>Home</NavLink>
      </li>
      <li className="nav_item">
        <NavLink to={`/services`}>Services</NavLink>
      </li>
      <li className="nav_item">
        <NavLink to={`/about`}>About Us</NavLink>
      </li>
      <li className="nav_item">
        <NavLink to={`/portfolio`}>Portfolio</NavLink>
      </li>
      <li className="nav_item">
        <NavLink to={`/contact`}>Contact Us</NavLink>
      </li>
    </ul>
  );
}

export default Navitems;
