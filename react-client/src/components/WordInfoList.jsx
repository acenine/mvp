import React from 'react';

const WordInfo = (props) => (
  <div>
    <h2>{props.wordInfo[0].word}</h2>
    <div>Definition and stuff</div>
    <div>WordInfo: {props.wordInfo[0].text}</div>
  </div>
)

export default WordInfo;