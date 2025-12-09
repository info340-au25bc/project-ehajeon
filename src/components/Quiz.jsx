import React, { useState } from 'react';
import { ExpandOverview } from './QuizPage';

import Q_DATA from "../data/quiz.json";

export function Quiz({ chars }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  if (currentQuestion >= Q_DATA.questions.length) {
    const topResults = scoreAnswers(userAnswers, chars);
    return <QuizResult results={topResults} chars={chars} />;
  }

  const question = Q_DATA.questions[currentQuestion];

  // HANDLERS
  function handleAnswer(answer) {
    setUserAnswers([...userAnswers, answer]); // Add answer to array
    console.log("User picked: ", answer.ans);

    setCurrentQuestion(currentQuestion + 1); // move onto next!
  };
  
  return (
    <div>
      <main>
          <div className="quiz">
              <h2>Question {question.id}</h2>
              <p>{question.question}</p>

              <div>
                {question.answers.map((ans, index) => (
                  <button key={index} onClick={() => handleAnswer(ans)}>
                    {ans.ans}
                  </button>
                ))}
              </div>
          </div>
      </main>
    </div>
  );
}

// SCORE ANSWERS

function scoreAnswers(userAnswers, chars) {
  let answerPool = [];

  for (const charKey in chars) {
    const char = chars[charKey];
    for (const jobKey in char.jobs) {
      answerPool.push({...char.jobs[jobKey], charName: charKey, _score: 0});
    }
  }

  userAnswers.forEach(answer => {
    // Filtering
    if (answer.filter) {
      answerPool = answerPool.filter(job => {
        let typeMatch = true;
        let roleMatch = true;

        if (answer.filter.type) {
          typeMatch = job.type === answer.filter.type;
        }

        if (answer.filter.role) {
          roleMatch = answer.filter.role.includes(job.role);
        }

        return typeMatch && roleMatch;
      });
    }

    // Scoring
    if (answer.score) {
      answerPool.forEach(job => {
        for (let key in answer.score) {
          const numVal = answer.score[key];
          const catVal = job.stats[key];

          if (typeof numVal === "number" && typeof catVal === "number") {
            const maxPoints = 5;
            const diff = Math.abs(numVal - catVal);
            const points = Math.max(maxPoints - diff, 0);
            job._score += points;
          } 
          else if (typeof numVal === "string" && numVal === catVal) {
            job._score += 3;
            if (key === "gender") {
              job._score += 5;
            }
          }
        } 
      });
    }
  });

  answerPool.sort((a, b) => b._score - a._score);

  // can check ranking and scores through console here!
  console.log("Top scored jobs:", answerPool.map(job => ({ name: job.name, score: job._score })));

  return answerPool.slice(0, 5);
};

// DISPLAY RESULTS

export function QuizResult({ results, chars }) {
  const [selectedResult, setSelectedResult] = useState(0);
  const topResult = results[selectedResult];
  const [selectedChar, setSelectedChar] = useState(null);
  const [activeJob, setActiveJob] = useState(null);

  const charsBase = Object.keys(chars);

  function handleSelect(base) {
    const char = chars[base];
    const defaultJob = Object.keys(char.jobs)[0];
    
    setSelectedChar(char);
    setActiveJob(defaultJob);
  }
  
  return (
    <div>
      <main>
        <header>
            <h1>Quiz Results</h1>
        </header>

          <h2>Your recommended character is...</h2>

          <div className="container">
            <div className="result" style={{backgroundImage: topResult.gradient}}>
                <div className="result-overlay">
                     <div className="result-overview">
                      <h3>{topResult.name}</h3>
                      <h4>Role: {topResult.type} {topResult.role}</h4>
                      <p>{topResult.desc}</p>
                      <p><strong>Pros:</strong> {topResult.pros}</p>
                      <p><strong>Cons:</strong> {topResult.cons}</p>
                    </div>
                </div>
                <img src={topResult.mc} alt={topResult.name} />
            </div>
          </div>

          <div className="ranked-results">
            <h2>Your Results: </h2>
            {results.map((res, i) => (
              <img 
                key={i}
                src={res.icon}
                alt={res.name}
                onClick={() => setSelectedResult(i)} />
            ))}
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
  )
}