import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <nav className="flex justify-between items-center bg-white p-2">
            <div className="flex items-center">
                <Link to="/" className='font-caveats text-[2.5rem] font-semibold  text-customLogo ' style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}>TaskNinja</Link>
            </div>
            <div className="hidden md:flex space-x-4 items-center">
                <Link to="/" onClick={closeMenu} className='font-poppins'>Home</Link>
                <Link to="/login" onClick={closeMenu}  className='font-poppins'>Login</Link>
                <Link to="/register" onClick={closeMenu} className='font-poppins'>Register</Link>
                <Link to="/dashboard" onClick={closeMenu} className='font-poppins'>Dashboard</Link>
            </div>
            <div className="md:hidden">
                <FaBars className="text-black text-2xl" onClick={toggleMenu} />
            </div>
            {showMenu && (
                <div className="md:hidden absolute top-16 right-0 bg-transparent p-4">
                    <Link to="/" className="block mb-2 font-poppins" onClick={closeMenu}>Home</Link>
                    <Link to="/login" className="block mb-2 font-poppins" onClick={closeMenu}>Login</Link>
                    <Link to="/register" className="block mb-2 font-poppins" onClick={closeMenu}>Register</Link>
                    <Link to="/dashboard" className="block mb-2 font-poppins" onClick={closeMenu}>Dashboard</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
