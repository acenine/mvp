import React from 'react';

const WordInfo = (props) => (
  <div>
    <h3><span><h2>{props.wordInfo.word} </h2>{props.wordInfo.pronunciation}</span></h3>
    <div>Definition: {props.wordInfo.definition}</div>
    <br/>
    <div>Example: {props.wordInfo.example}</div>
  </div>
)

export default WordInfo;