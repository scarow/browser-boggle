module.exports = {

  indexOfObject(array, obj, objField){
    var index;
    for(var i = 0, len = array.length; i < len; i++) {
      if (array[i][objField] === obj[objField]) {
        index = i;
        break;
      }
    }
    return index;
  },

  shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }
};