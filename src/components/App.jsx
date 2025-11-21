import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router';

import Home from './Home';
import { QuizPage } from './QuizPage.jsx';
import { BuildParty } from './PartyBuilder.jsx';
import { Progression } from './Progression.jsx';
import { Navigation } from './Nav';
import { LogInRegister } from './Login.jsx';

import CHAR_DATA from '../data/chars.json';


function App(props) {
    const chars = CHAR_DATA
    
    return (
    <>
        <div>
            <Navigation />
        </div>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="quiz" element={<QuizPage chars={chars} />} />
            <Route path="buildparty" element={<BuildParty />} />
            <Route path="progression" element={<Progression />} />
            <Route path="login" element={<LogInRegister />} />
        </Routes>

        <footer>
            <div>
                <p>&copy; All materials belong to KOG 2000 </p>
            </div>
        </footer>
    </> 
    );
}

export default App;