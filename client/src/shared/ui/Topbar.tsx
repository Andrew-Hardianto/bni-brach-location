import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Topbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            setIsDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <>
            {
                userInfo ? (
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow" style={{ borderColor: '#ffff' }} >

                        <form className="form-inline">
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>
                        </form>

                        <ul className="navbar-nav ml-auto">

                            {/* Dark Mode Toggle Button */}
                            <li className="nav-item d-flex align-items-center mr-3">
                                <button
                                    className={`btn btn-sm ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
                                    onClick={toggleDarkMode}
                                    title="Toggle Dark Mode"
                                    style={{ borderRadius: '20px', padding: '5px 10px' }}
                                >
                                    {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                                </button>
                            </li>

                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userInfo.user.Username}</span>
                                    <i className="fas fa-fw fa-user"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <Link className="dropdown-item" to="/user">
                                        <i className="fas fa-users fa-sm fa-fw mr-2 text-gray-400"></i>
                                        User
                                    </Link>
                                    <Link className="dropdown-item" to="/user/profile">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>

                        </ul>

                    </nav >
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default Topbar
