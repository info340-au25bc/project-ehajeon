import React, { useState } from 'react';
import CHAR_DATA from "../data/chars.json"



function QuizResult({ data }) {
  return (
    <div>
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