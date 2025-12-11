import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { useAuth } from '../contexts/authContext';
import { signOut } from '../firebase/auth';

export function Navigation(props) {
    const [isActive, setIsActive] = useState(false);
    const { userLoggedIn } = useAuth();

    function handleClick() {
        setIsActive(!isActive);
    };

    function handleClose() {
        setIsActive(false);
    };

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Couldn't sign out", error);
        }
    };

    let hamClass = "hamburger-menu";
    let menuClass = "off-screen-menu";

    if (isActive) {
        hamClass += " active";
        menuClass += " active";
    };

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
                    {userLoggedIn ? (
                        <button className="sign-out" onClick={handleSignOut}>sign out</button>
                    ) : (
                        <NavLink to="login">login</NavLink>
                    )}
                    <a>light</a>
                </div>
            </nav>
        </div>
  );
}