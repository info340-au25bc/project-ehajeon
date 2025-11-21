import React, { useState, useEffect } from 'react';
import CHAR_DATA from "../data/chars.json"

export function QuizPage(props) {
    // basic + test
    let chars = props.chars || [];
    console.log(chars.Elsword.jobs.KE.name); // logs Knight Emperor

    // STATES
    const charsBase = Object.keys(CHAR_DATA);
    const [selectedChar, setSelectedChar] = useState(null);
    const [activeJob, setActiveJob] = useState(null);

    // HELPER
    function handleSelect(key) {
        const char = CHAR_DATA[key];
        const defaultJob = Object.keys(char.jobs)[0];
        const data = char.jobs[defaultJob];

        setSelectedChar(char);
        setActiveJob(defaultJob);
    }

    useEffect(() => {
      if (selectedChar) {
        const overviewDiv = document.getElementById("overview");
        overviewDiv?.scrollIntoView({ behavior: "smooth" });
      }
    }, [selectedChar]);

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
                    {charsBase.map((c) => (
                        <img
                            key={c}
                            src={`img/icons/${c}.png`}
                            alt={`Base ${c}`}
                            className="base"
                            onClick={() => handleSelect(c)}
                        />
                    ))}
                </div>

                <h2>↓</h2>

                <div id="overview" className={selectedChar ? "active" : ""}>
                    {selectedChar && (
                        <ExpandOverview
                            char={selectedChar}
                            activeJob={activeJob}
                            setActiveJob={setActiveJob} />
                    )}
                </div>
            </main>
        </div>
    );
}

function ExpandOverview({ char, activeJob, setActiveJob }) {
  const data = char.jobs[activeJob];

  return (
    <div>
      <div className="paths">
        <ul>
          {Object.keys(char.jobs).map((jobKey) => (
            <li key={jobKey}>
              <img
                src={`img/icons/${jobKey}.png`}
                alt={jobKey}
                className={`job ${activeJob === jobKey ? "active" : ""}`}
                onClick={() => setActiveJob(jobKey)} // update active job
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <img src={data.img} className="portrait" alt={data.name} />
      </div>

      <div className="char-info">
        <h3>{data.name}</h3>
        <h4>{data.role}</h4>
        <p>{data.desc}</p>
        <p><strong>Pros:</strong> {data.pros}</p>
        <p><strong>Cons:</strong> {data.cons}</p>
      </div>
    </div>
  );
}

// <expandOverview data={selectedChar} />