import React from 'react';
import { NavLink } from 'react-router';

export function Navigation() {
  return (
    <div>
        <div className="off-screen-menu">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="quiz">Character Quiz</NavLink></li>
                <li><NavLink to="buildparty">Party Builder</NavLink></li>
                <li><NavLink to="progression">Progression Guide</NavLink></li>
            </ul>
        </div>
        
        <nav>
            <div className="hamburger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="right-items">
                <a href="login">login</a>
                <a>light</a>
            </div>
        </nav>
    </div>
  );
}