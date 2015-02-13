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
    $('body').load('partials/content.html', function(){

      if(window.auth){
        // retrieve the data
        this.getData();
        // add page scroll & mousemove events
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
      },
      error: function (msg){
        console.log(msg);
      }
    })
  }
  
  ap.render = function (fromIndex){

    $('.handle').render({ name: '@'+Models.handle });
    $('.favourites').render(Models.live, this.directives());

    // set profile image
    UI.profiles();
    // draw effect
    UI.fx(fromIndex);
    // update UI
    UI.setControls();
  }
  ap.directives = function(){
    // use for templates handling
    var attribute = {
      hidden: {
        'data-id': function() {      
          return this.tweet.id;
        }
      },
      profile: {
        'data-src': function() {
          return this.tweet.img
        }
      }
    }
    return attribute
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
      },
      clearLocalStorage: function(){
        Controller.kill();
      }
    }
  }
  return App;
});