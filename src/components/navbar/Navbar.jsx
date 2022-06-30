import React from 'react';
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import Navitems from './navitems';


function Navbar() {
    return (
        <header className='header'>
            <NavLink to={`/home`} className="logo">Company PortF</NavLink>
            <Navitems />
        </header>
    )
}

export default Navbar