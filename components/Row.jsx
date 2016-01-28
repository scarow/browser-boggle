import React from 'react';
import ReactDOM from 'react-dom';
import Die from './Die.jsx';

class Row extends React.Component {
  
  render() {
    var dice = this.props.dice.map(function(d, i){
      return (
        <div key={i}>
          <Die faceValues={d} row={this.props.row} column={i} activeLetters={this.props.activeLetters} onDieClick={this.props.onDieClick} onRemoveDie={this.props.onRemoveDie}/>
        </div>
      );
    }.bind(this));
    return (
      <div className="row">
        {dice}
      </div>
    )
  }
}

module.exports = Row;