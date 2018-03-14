import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import WordInfo from './components/WordInfo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      word: '',
      wordInfo: []
    }
  }

  componentDidMount() {
    this.getRandomWord();
  }


  getRandomWord() {
    $.get('/random', (data) =>{
      this.setState({
        word: data.word
      })
      this.getQueryDef(this.state.word)
    })
  }


  getQueryDef(query) {
    $.get('/word', {query: query}, (data) =>{
      this.setState({
        wordInfo: data
      })
    })
  }


  render () {
    return (
      <div>
        <h1>What does that mean?</h1>
        <h3>Enter a word to see its definition: </h3>
        <Search getQueryDef={this.getQueryDef.bind(this)}/>
        <WordInfo wordInfo={this.state.wordInfo}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
