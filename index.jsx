var React = require('react')
var ReactDOM = require('react-dom')
import Board from './components/Board.jsx';

var DICE = [
  "aaafrs", "aaeeee", "aafirs", "adennn", "aeeeem",
  "aeegmu", "aegmnn", "afirsy", "bjkqxz", "ccenst",
  "ceiilt", "ceilpt", "ceipst", "ddhnot", "dhhlor",
  "dhlnor", "dhlnor", "eiiitt", "emottt", "ensssu",
  "fiprsy", "gorrvw", "iprrry", "nootuw", "ooottu"
];

ReactDOM.render(<Board dice={DICE}/>, document.getElementById('content'))
