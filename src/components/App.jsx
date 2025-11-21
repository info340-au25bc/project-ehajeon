import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router';
import { Navigation } from './Nav';


import CHAR_DATA from '../data/chars.json';

function App(props) {
    const chars = CHAR_DATA
    
    return (
    <>
        <div>
            <Navigation />
        </div>

        <main>
            <div id="intro">
            <header>
                <h1>ElGuide</h1>
                <p>Elguide is a small student project about the MMO Elsword, aiming to help early and mid-game players figure out how to get the most out of the game; specifically, to make informed decisions without resorting to p2w methods or dig around Reddit/Discord for answers. Essentially, consider it as a beginner's guide!</p>
            </header>

                <h2>Last Updated (11/9/2025)</h2>
                <ul>
                    <li>Added all Prelim designs of pages!</li>
                </ul>
            </div>

            <div className="cards">
                <div className="card"> <a href="quiz.html">
                    <img src="img/ElsSD.png" alt="Small deformation Elsword"></img>
                    <h2>Character Quiz</h2>
                </a></div>

                <div className="card"> <a href="buildparty.html">
                    <img src="img/RenaSD.png" alt="Small deformation Rena"></img>
                    <h2>Party Builder</h2>
                </a></div>

                <div className="card"> <a href="progression.html">
                    <img src="img/PowerPunch.png" alt="Small deformation Raven and Laby in front of Power Punch"></img>
                    <h2>Progression Checklist</h2>
                </a> </div>
            </div>

            <div>

            </div>
        </main>

        <footer>
            <div>
                <p>&copy; All materials belong to KOG 2000 </p>
            </div>
        </footer>
    </> 
    );
}

export default App;