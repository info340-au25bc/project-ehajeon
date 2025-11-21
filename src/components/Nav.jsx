import React from 'react';
import { NavLink } from 'react-router';

export function Navigation() {
  return (
    <div>
        <div className="off-screen-menu">
            <ul>
                <li><NavLink to="index.html">Home</NavLink></li>
                <li><NavLink to="quiz.html">Character Quiz</NavLink></li>
                <li><NavLink to="buildparty.html">Party Builder</NavLink></li>
                <li><NavLink to="progression.html">Progression Guide</NavLink></li>
            </ul>
        </div>
        
        <nav>
            <div className="hamburger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="right-items">
                <a href="login.html">login</a>
                <a>light</a>
            </div>
        </nav>
    </div>
  );
}