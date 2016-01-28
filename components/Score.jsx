import React from 'react';
import ReactDOM from 'react-dom';

class Score extends React.Component {
  
  render() {
    var total = 0;
    var scores = this.props.score.map(function(s, i){
      total += s[1];
      return (
        <tr key={i}>
          <td> {s[0]} </td>
          <td> {s[1]} </td>
        </tr>
      );
    });
    return (
      <table>
        <tbody>
          <tr>
           <th>Word</th>
           <th>Score</th>
         </tr>
          {scores}
          <tr>
            <td id='bold'>Total</td>
            <td> {total} </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

module.exports = Score;