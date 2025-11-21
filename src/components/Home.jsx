import React from 'react';
import { NavLink, Link } from 'react-router';

export default function Home() {
    return(
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
                <div className="card">
                    <Link to="/quiz">
                        <img src="img/ElsSD.png" alt="Small deformation Elsword"></img>
                        <h2>Character Quiz</h2>
                    </Link>
                </div>

                <div className="card">
                    <Link to="/buildparty">
                        <img src="img/RenaSD.png" alt="Small deformation Rena"></img>
                        <h2>Party Builder</h2>
                    </Link>
                </div>

                <div className="card">
                    <Link to="/progression">
                        <img src="img/PowerPunch.png" alt="Small deformation Raven and Laby in front of Power Punch"></img>
                        <h2>Progression Checklist</h2>
                    </Link>
                </div>
            </div>
        </main>
    )
}