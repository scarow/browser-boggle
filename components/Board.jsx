import React from 'react';
import ReactDOM from 'react-dom';
import Row from './Row.jsx';
import CurrentWord from './CurrentWord.jsx';
import Score from './Score.jsx';
import _ from 'underscore';
import util from '../util/util.jsx';
var maxScore = 11;
var maxWordLength = 7;

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWord: [],
      score: [],
      previousWords: [],
      dice: util.shuffle(this.props.dice)
    };
    this.scoreTable = {
      1: 0,
      2: 0,
      3: 1,
      4: 1,
      5: 2,
      6: 3,
      7: 5
    };
  };

  dieClick(die){
    if (this.state.currentWord.length > 0 && !this.isDieValid(die)){
      this.removeAllDie();
    } else {
      this.setCurrentWord(die);      
    }
  };

  isDieValid(die){
    var row = die.row;
    var column = die.column;
    var lastDieRow = parseInt(this.state.currentWord[this.state.currentWord.length - 1].row);
    var lastDieColumn = parseInt(this.state.currentWord[this.state.currentWord.length - 1].column);
    // if row or column is within 1, ok
    if ((lastDieColumn === column + 1 ||
        lastDieColumn === column -1 ||
        lastDieColumn === column) &&
        (lastDieRow === row + 1 ||
        lastDieRow === row - 1 ||
        lastDieRow === row)){
      return true;
    } else {
      return false;
    }
  };

  setCurrentWord(die){
    var currentWord = this.state.currentWord;
    
    currentWord.push(die);
    this.setState({
      currentWord: currentWord
    });
  };

  removeDie(die){
    // remove values up to die; 
    // better than having to click backwards to remove letters IMO
    var currentWord = this.state.currentWord;
    var end = util.indexOfObject(currentWord, die, 'id');
    currentWord = currentWord.slice(0, end);
    this.setState({
      currentWord: currentWord
    });
  };

  removeAllDie(){
    this.setState({
      currentWord: []
    });
  };

  submitWord(){
    if (!this.state.currentWord){
      return null; 
    }

    var newScore = {};
    var score = this.state.score;
    var currentWord = this.state.currentWord.map(function(word){
      return word.value;
    });
    // do ajax
    var wordScore = this.calculateScore(currentWord);
    // if score is 0, wordScore is falsy -- have to check for undefined & null specifically
    if (wordScore != undefined && wordScore != null){
      score.push([currentWord, wordScore]);
      this.setState({
        score: score
      });
    }
  };

  calculateScore(word){
    var previousWords = this.state.previousWords;
    word = word.join('');
    if (!_.contains(previousWords, word)){
      previousWords.push(word);
      this.setState({
        previousWords: previousWords
      })
      this.removeAllDie();
      return word.length > maxWordLength ? maxScore : this.scoreTable[word.length];
    } else {
      alert("You already used that word!");
      this.removeAllDie();
    }
  };

  render() {
    var props = {
      activeLetters: this.state.currentWord.map(function(w){ return w.id} ),
      onDieClick: this.dieClick.bind(this),
      onRemoveDie: this.removeDie.bind(this)
    };
    return (
      <div className='boardContainer'>
        <div className='grid'>
          <Row {...props}
            dice={this.state.dice.slice(0, 5)} 
            row={1}/>
          <Row {...props}
            dice={this.state.dice.slice(5, 10)}
            row={2} />
          <Row {...props}
            dice={this.state.dice.slice(10, 15)}
            row={3}/>
          <Row {...props}
            dice={this.state.dice.slice(15, 20)} 
            row={4}/>
          <Row {...props}
            dice={this.state.dice.slice(20, 25)} 
            row={5}/>
        </div>
        <div id='currentWordSubmitWrapper'>
          <CurrentWord currentWord={this.state.currentWord}/>
          <input id='submit' type="submit" onClick={this.submitWord.bind(this)}/>
        </div>
        <div id='noFloat'>
          <Score score={this.state.score} />
        </div>
      </div>
    )
  }
}

module.exports = Board;