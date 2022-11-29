import React, {useEffect, useState} from 'react';
import './Footer.scss';
import Auth from "../../services/auth";


const Footer = () => {
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
        <div>
            <div className='container'>
                <div className='footer__row align-items-lg-center align-items-start'>
                    <nav className='footer__menu'>
                        {currentUser ? (
                            <ul className='menu'>
                                <li className='menu__item'>
                                    <a href="/about">Про нас</a>
                                </li>
                                <li className='menu__item'>
                                    <a href="/about">Послуги</a>
                                </li>
                                <li className='menu__item'>
                                    <a href="/timetable">Розклад</a>
                                </li>
                                <li className='menu__item'>
                                    <a href="/reviews">Відгуки</a>
                                </li>
                                <li className='menu__item'>
                                    <a href="/profile">Особистий кабінет</a>
                                </li>
                                <li className='menu__item'>
                                    <a href="/" onClick={logout}>Вихід</a>
                                </li>
                            </ul>
                        ) : (
                            <ul className='menu'>
                                <li className='menu__item'>
                                    <a href="/about">Про нас</a>
                                </li>
                                <li className='menu__item'>
                                    <a href="/about">Послуги</a>
                                </li>
                                <li className='menu__item'>
                                    <a href="/timetable">Розклад</a>
                                </li>
                                <li className='menu__item'>
                                    <a href="/reviews">Відгуки</a>
                                </li>
                                <li className='menu__item'>
                                    <a href="/login">Увійти</a>
                                </li>
                            </ul>
                        )}
                    </nav>
                    <div className='footer__contacts d-lg-block d-flex flex-column'>
                        <ul className='contacts__list pl-0'>
                            <li className='contacts__item address'>адрес</li>
                            <li className='contacts__item time'>графік роботи</li>
                            <li className='contacts__item phone'>номер телефону</li>
                        </ul>
                        <div className='mobile-logo align-self-end mt-auto'>
                            <a><img src={require('../../img/logo.png')} alt='Logotype'/></a>
                        </div>
                    </div>
                    <div className='footer__logo'>
                        <a><img src={require('../../img/logo.png')} alt='Logotype'/></a>
                    </div>
                </div>
            </div>
            <hr className='footer__hr'/>
            <div className="footer__copy text-center">
                <p>&copy; BeFIT</p>
            </div>
        </div>
    );
};

export default Footer;