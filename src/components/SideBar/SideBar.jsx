// Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLibraryAdd, MdHome, MdLogout } from 'react-icons/md';
import './SideBar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };
    const handleHome = () => {
        navigate('/home');
    }

    return (
        <header className="sidebar">
            <Link to="/new" className="newWorkspace" title='Agregar nuevo Workspace'>
                <MdLibraryAdd size={30} />
            </Link>
            <button
                onClick={handleHome}
                title="Ir a inicio"
                className="home-button"
            >
                <MdHome size={30} />
            </button>
            <button
                onClick={handleLogout}
                title="Cerrar sesión"
                className="logout-button"
            >
                <MdLogout size={30} />
            </button>
        </header>
    );
};

export default Sidebar;
