define([], function(){
  
  var Helpers = {

    switchIndex: function (array, capture, target) {
      var temp = array[capture];
      array[capture] = array[target];
      array[target] = temp;
    }

  }

  return Helpers
})