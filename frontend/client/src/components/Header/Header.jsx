import React, { useEffect, useState } from 'react';
import './Header.scss';
import { Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Auth from "../../services/auth";

const Header = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = Auth.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logout = () => {
        Auth.logout();
        setCurrentUser(undefined);
    };

    return (
        <Navbar collapseOnSelect expand="lg" className='header__row navbar-dark'>
            <div className='container'>
                <Navbar.Brand href="/" className='header__logo'>
                    <img className="" src={require('../../img/logo.png')} alt='Logotype'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className='header__toggle'
                               style={{color: 'white', border: 'none'}}/>
                <Navbar.Collapse id="responsive-navbar-nav"
                                 className='header__body flex-lg-column flex-row align-items-stretch py-lg-0 py-3'>
                    <div className='header__contacts'>
                        <ul className='contacts__list flex-column flex-lg-row align-items-start align-items-lg-start'>
                            <li className='contacts__item address mb-lg-0 mb-3 pt-1'>адреса
                            </li>
                            <li className='contacts__item time mb-lg-0 mb-3 pt-1'>
                                графік роботи
                            </li>
                            <li className='contacts__item phone mb-lg-0 mb-3 pt-1'>номер телефону</li>
                        </ul>
                    </div>
                    {currentUser ? (
                        <Nav className='header__menu'>
                            <Link to="/about">Про нас</Link>
                            <Link to="/services">Послуги</Link>
                            <Link to="/timetable">Розклад</Link>
                            <Link to="/reviews">Відгуки</Link>
                            <Link to="/profile">Особистий кабінет</Link>
                            <Link to="/login" onClick={logout}>Вихід</Link>
                        </Nav>
                    ) : (
                        <Nav className='header__menu'>
                            <Link to="/about">Про нас</Link>
                            <Link to="/services">Послуги</Link>
                            <Link to="/timetable">Розклад</Link>
                            <Link to="/reviews">Відгуки</Link>
                            <Link to="/login">Увійти</Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;