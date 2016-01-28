import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

class Die extends React.Component {
  constructor(props) {
    super(props);
    var value = this.getRandom(this.props.faceValues);
    this.die = {
      value: value,
      column: this.props.column,
      row: this.props.row,
      id: this.props.row + '' + this.props.column + '' + value
    }
  };

  getRandom(faceValues){
    faceValues = faceValues.split('')
    var value = faceValues[Math.floor(Math.random() * faceValues.length)].toUpperCase();
    if (value === 'Q'){
      value = 'Qu';
    }
    return value;
  };

  dieClicked(){
    if (!this.isActive()){
      this.props.onDieClick(this.die);
    } else {
      this.props.onRemoveDie(this.die);
    }
  };

  isActive(){
    return _.contains(this.props.activeLetters, this.die.id);
  };

  render() {
    var classNames = "die clicked-" + this.isActive();
    return (
      <div className={classNames} onClick={this.dieClicked.bind(this)}>
        {this.die.value}
      </div>
    )
  }
}

module.exports = Die;