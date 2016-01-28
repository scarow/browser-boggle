import React from 'react';
import ReactDOM from 'react-dom';

class CurrentWord extends React.Component {
  render() {
    var currentWord = this.props.currentWord.map(function(word){
      return word.value;
    });
    return (
      <div id='currentWord'>
        Current Word: {currentWord}
      </div>
    )
  }
}

module.exports = CurrentWord;