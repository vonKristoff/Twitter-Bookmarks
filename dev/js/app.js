define(['jquery', 'transparency'], function ($, Transparency){

  // bind Template engine to jQuery
  $.fn.render = Transparency.jQueryPlugin;

  var App = function(){
    
    this.init();
      
    return this.api()
  }
  var ap = App.prototype;
  
  ap.init = function(){
      
    if(window.auth){
      // retrieve the data
      
    } else {
      this.errs('something bad happened in the woods.')
    }
  };
    
  ap.render = function(){
    
  }
  ap.errs = function (msg){
    var data = {
      msg: msg
    }
    Transparency.render(document.getElementById('error'), data);
  }
  ap.api = function(){
    return {
      info: {
        version: 1.0,
        name: 'Twitter Bookmarks'
      }
    }
  }
  return App;
});