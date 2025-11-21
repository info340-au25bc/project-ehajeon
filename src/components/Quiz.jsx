import React from 'react';

export function QuizPage(props) {
    let chars = props.chars || [];

    return (
        <div>
            <main>
                <div className="quiz-intro">
                    <div className="container">
                        <div className="overlay">
                            <header>
                                <h1>Character Quiz</h1>
                            </header>
                            <h2>Not sure who to main?</h2>
                            <p>Take the quiz here!</p>
                            <button><a href="quiz_pages/q_one.html">START</a></button>
                        </div>
                        <img src="img/KEBanner.png" className="banner" alt="Knight Emperor's Master Class skill cut-in"></img>
                    </div>
                </div>

                <h2>... Or, flip through the provided character profiles below!</h2>

                <div className="chars">
                    <img src="img/icons/Elsword.png" alt="Base Elsword" className="base" data-char="Elsword"/>

                    <img src="img/icons/Aisha.png" alt="Base Aisha" className="base" data-char="Aisha"/>

                    <img src="img/icons/Rena.png" alt="Base Rena" className="base" data-char ="Rena"/>

                    <img src="img/icons/Raven.png" alt="Base Raven" className="base" data-char ="Raven"/>

                    <img src="img/icons/Eve.png" alt="Base Eve" className="base" data-char = "Eve"/>

                    <img src="img/icons/Chung.png" alt="Base Chung" className="base" data-char="Chung"/>

                    <img src="img/icons/Ara.png" alt="Base Ara" className="base" data-char="Ara"/>

                    <img src="img/icons/Elesis.png" alt="Base Elesis" className="base" data-char="Elesis"/>

                    <img src="img/icons/Add.png" alt="Base Add" className="base" data-char="Add"/>

                    <img src="img/icons/Luciel.png" alt="Base Luciel" className="base" data-char="Luciel"/>

                    <img src="img/icons/Rose.png" alt="Base Rose" className="base" data-char="Rose"/>

                    <img src="img/icons/Ain.png" alt="Base Ain" className="base" data-char="Ain"/>

                    <img src="img/icons/Laby.png" alt="Base Laby" className="base" data-char="Laby"/>

                    <img src="img/icons/Noah.png" alt="Base Noah" className="base" data-char="Noah"/>

                    <img src="img/icons/Lithia.png" alt="Base Lithia" className="base" data-char="Lithia"/>
                </div>

                <h2>↓</h2>

                <div className="overview"></div>
            </main>
        </div>
    );
}