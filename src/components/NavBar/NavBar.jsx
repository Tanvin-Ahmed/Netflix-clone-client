import React, { useEffect, useState } from 'react';
import './NavBar.css';
import logo from '../../img/logo/logo.png';
import avatar from '../../img/avatar/Netflix-avatar.png';
import { useHistory } from 'react-router';

const NavBar = () => {
    const [show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavbar);
        return () => window.removeEventListener('scroll', transitionNavbar);
    }, []);

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <img onClick={() => history.push("/")} className="nav__logo" src={logo} alt="" />
                <img onClick={() => history.push("/profile")} className="nav__avatar" src={avatar} alt="" />
            </div>
        </div>
    );
};

export default NavBar;