define(['jquery', 'models'], function ($, Models){
  
  var UI = {};

  UI.setControls = function(){
    
    $('.favourites li').each(function (i, itm){
      var $li = $(this);

      $li.on('mousedown', function(){
        console.log($(this).index());
      })
      $li.on('mouseover', function(){
        console.log($(this).index());
      })
    })

  }

  

  

  return UI
})