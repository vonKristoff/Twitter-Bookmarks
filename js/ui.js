define(['jquery', 'models', 'controller'], function ($, Models, Controller){
  
  var UI = {
    x:0,
    y:0,
  };

 

  UI.setControls = function(){

    var from, to;
    
    $('.favourites li').each(function (){
      
      var $li = $(this);

      $li.on('mousedown', function(){
        Controller.Dragging.capture = $(this).index();
        // from = $(this).children('.tweet--container').clone();
        
      })
      $li.on('mouseover', function(){
        Controller.Dragging.target = $(this).index();
        // if(Controller.Dragging.capture != Controller.Dragging.target){
        //   to = $(this).children('.tweet--container').clone();  
        // }
        // $(this).children('.tweet--container').css('opacity',0)
      })

      $li.on('mouseleave', function(){
        // $(this).children('.tweet--container').css('opacity',1)
      })

    })

    $('.favourites').on('mousedown', function(){
      $('.hotspot').addClass('active');
      Controller.startDrag();
    })
    $('.favourites').on('mouseup', function(){
      $('.hotspot').removeClass('active');
      Controller.endDrag();
    })

    $('.results--container').on('mousedown', function(){
      $(this).addClass('dragging')
    })

  }


  UI.addEvents = function (){

    document.addEventListener('mouseup', function(){
      if($('.results--container').hasClass('dragging')) $('.results--container').removeClass('dragging');
    })

    document.addEventListener('mousemove', function (e){
      
      UI.x = e.clientX;
      UI.y = e.clientY;

      $('.focus').css({
        'transform': 'translate('+UI.x+'px,'+UI.y+'px)'
      })
    })

  }
  
  return UI
})