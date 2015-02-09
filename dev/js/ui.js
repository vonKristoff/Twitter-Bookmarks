define(['jquery', 'models', 'controller'], function ($, Models, Controller){
  
  var UI = {
    x:  0,
    y:  0,
    sy: 0,  // scroll y offset
    ox: 0,  // tweet of focus x offset
    oy: 0   // tweet of focus y offset
  };

  UI.setControls = function(){

    var clone, to;
    
    // bind to each tweet item --> should be inheriting the function
    $('.favourites li').each(function (){
      
      var $li = $(this);
      // the begin to drag view coords and html clone 
      $li.on('mousedown', function(e){

        var $this = $(this)
        ,   o = $this.offset();

        // pass to controller to know who we are dragging (index to match array index)
        Controller.Dragging.capture = $this.index();
        
        // set offset coords from mouse pointer to list-item, for nice dragging
        UI.ox = e.pageX - o.left;
        UI.oy = e.pageY - o.top;
        UI.x  = e.pageX - UI.ox;
        UI.y  = e.pageY - UI.oy;
        UI.sy = window.pageYOffset;

        // set target clone to mouse position..
        $('.focus').css({
          'transform': 'translate('+UI.x+'px,'+UI.y+'px)'
        })
        // catch clone
        clone = $this.children('.tweet--container').clone();
        // access to style
        clone.css({
          'width': $('.results--container').width()
        })
        // capture to logic
        Controller.startDrag();
        // add to DOM
        $('.focus .hotspot').html(clone)
      })

      $li.on('mouseover', function(){
        // potential drop target
        Controller.Dragging.target = $(this).index();
        if(Controller.Dragging.is) {
          $(this).addClass('dragover')
        } else {
          $(this).addClass('nudge')
        }
      })

      $li.on('mouseleave', function(){
        if(Controller.Dragging.is) {
          $(this).removeClass('dragover')
        } else {
          $(this).removeClass('nudge')
        }
      })

    })

    $('body').on('mouseup', function(){
      // clear clone
      $('.hotspot').html('');
    })
    // end drag
    $('.results--container').on('mouseup', function(){
      Controller.endDrag();
    })
  }

  UI.addEvents = function (){

    // track mouse movements for drag
    document.addEventListener('mousemove', function (e){
      
      UI.x = e.clientX - UI.ox;
      UI.y = e.clientY - UI.oy;

      var scrollY = UI.sy + UI.y;
      $('.focus').css({
        'transform': 'translate('+UI.x+'px,'+scrollY+'px)'
      })
    })

    // update y offset if dragging when scrolling
    document.addEventListener('scroll', function (e){

      UI.sy = window.pageYOffset;

      var scrollY = UI.sy + UI.y;
      $('.focus').css({
        'transform': 'translate('+UI.x+'px,'+scrollY+'px)'
      })
    })
  }

  // add bg profile images to tweets
  UI.profiles = function (){
  
    $('.tweet').each(function (i){
      
      var p = $(this).find('.profile');
      // get img src
      var src = Models.live[i].tweet.img
      // set bg
      p.css({
        'background-image': 'url('+src+')'
      })      
    })  
  }

  // onload delay opacity for each item
  UI.fx = function (from){

    var start = 1
    if(from) start = from;

    var reveal = function (n){
      $('.tweet:nth-child('+n+')').css('opacity',1);
    }
    for(var j=start;j<=Models.live.length;j++){
      $('.tweet:nth-child('+j+')').css('opacity',0);

      setTimeout(function(j) {
        reveal(j);
      }.bind(this, j), (j - start) * 100);
    }
  }
  
  return UI
})