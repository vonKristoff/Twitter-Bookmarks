define(['jquery', 'transparency', 'models', 'controller', 'ui'], function ($, Transparency, Models, Controller, UI){

  // bind Template engine to jQuery
  $.fn.render = Transparency.jQueryPlugin;

  var App = function(){
    
    this.init();
      
    return this.api()
  }
  var ap = App.prototype;
  
  ap.init = function(){
    // add templates to page
    $('.wrapper').load('partials/content.html', function(){
      
      if(window.auth){
        // retrieve the data
        this.getData();
        // Controller.update.call(this);
        UI.addEvents();
      } else {
        this.errs('something bad happened in the woods.')
      }
    }.bind(this));  
  };
  
  ap.getData = function(){
    var $this = this;
    $.ajax({
      url:'tweets.php',
      success: function (res){
        var data = JSON.parse(res);
        Controller.update.call($this, data);
      }
    })
  }
  
  ap.render = function(){
    $('.handle').render({ name: Models.handle });
    $('.favourites').render(Models.live);

    // update UI
    UI.setControls();
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