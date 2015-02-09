define(['jquery', 'models', 'controller'], function ($, Models, Controller){
  
  var UI = {
    x:0,
    y:0,
    sy: 0, // scroll y offset
    ox:0,  // tweet of focus x offset
    oy:0   // tweet of focus y offset
  };

  UI.setControls = function(){

    var from, to;
    
    $('.favourites li').each(function (){
      
      var $li = $(this);

      $li.on('mousedown', function(e){

        var o = $(this).offset();
        UI.ox = o.left;
        UI.oy = o.top;
        UI.x = e.pageX - o.left;
        UI.y = e.pageY - o.top;
        UI.sy = window.pageYOffset;

        var scrollY = UI.sy + e.pageY;

        $('.focus').css({
          'transform': 'translate('+UI.x+'px,'+scrollY+'px)'
        })


        Controller.Dragging.capture = $(this).index();
        from = $(this).children('.tweet--container').clone();
        from.css({
          width:$('.results--container').width()
        })
        
        Controller.startDrag();

        $('.hotspot').html(from)
      })

      $li.on('mouseover', function(){
        Controller.Dragging.target = $(this).index();
        $(this).addClass('dragover')
        // if(Controller.Dragging.capture != Controller.Dragging.target){
        //   to = $(this).children('.tweet--container').clone();  
        // }
        // $(this).children('.tweet--container').css('opacity',0)
      })

      $li.on('mouseleave', function(){
        $(this).removeClass('dragover')
      })

    })


    $('body').on('mouseup', function(){
      // clear clone
      $('.hotspot').html('');
    })

  }


  UI.addEvents = function (){

    

    document.addEventListener('mousemove', function (e){
      
      UI.x = e.clientX - UI.ox;
      UI.y = e.clientY - UI.oy;

      var scrollY = UI.sy + UI.y;

      $('.focus').css({
        'transform': 'translate('+UI.x+'px,'+scrollY+'px)'
      })
    })

    document.addEventListener('scroll', function (e){

      UI.sy = window.pageYOffset;

      var scrollY = UI.sy + UI.y + UI.oy;

      $('.focus').css({
        'transform': 'translate('+UI.x+'px,'+scrollY+'px)'
      })
      
    })

  }

  

  UI.fx = function (from){

    var start = 3
    if(from) start = from;

    var reveal = function (n){
      $('.tweet:nth-child('+n+')').css('opacity',1);
    }

    for(var j=start;j<=Models.live.length;j++){
      $('.tweet:nth-child('+j+')').css('opacity',0);

      $('.tweet:nth-child('+j+')').find('.text').text().html

      setTimeout(function(j) {
        reveal(j);
      }.bind(this, j), (j - start) * 100);
    }
  }
  
  return UI
})