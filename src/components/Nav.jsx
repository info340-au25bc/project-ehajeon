import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { LogInRegister } from './Login';

export function Navigation() {
    const [isActive, setIsActive] = useState(false);

    function handleClick() {
        setIsActive(!isActive);
    }

    function handleClose() {
        setIsActive(false);
    }

    let hamClass = "hamburger-menu";
    let menuClass = "off-screen-menu";

    if (isActive) {
        hamClass += " active";
        menuClass += " active";
    }

    return (
        <div>
            <div className={menuClass}>
                <ul>
                    <li><NavLink to="/" onClick={handleClose}>Home</NavLink></li>
                    <li><NavLink to="quiz" onClick={handleClose}>Character Quiz</NavLink></li>
                    <li><NavLink to="buildparty" onClick={handleClose}>Party Builder</NavLink></li>
                    <li><NavLink to="progression" onClick={handleClose}>Progression Guide</NavLink></li>
                </ul>
            </div>

            <nav>
                <div className={hamClass} onClick={handleClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="right-items">
                    <NavLink to="login">login</NavLink>
                    <a>light</a>
                </div>
            </nav>
        </div>
  );
}