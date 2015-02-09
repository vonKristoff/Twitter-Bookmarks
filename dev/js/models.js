define([], function (){

  var Models = {
    handle:'',  // user name
    raw:[],     // incoming tweets from twitter, filtered down to app use case
    local:[],   // what we have previously stored
    live:[],    // live scope to reorder within as well as render from
    order:[]    // temp array to see if there are any new tweets to prepend to our saved order
  };

  Models.filter = function (item, i){
    // construct object from raw tweet, taking the things we need
    // nb keeping it basic for use with Transparency render
    return {
      tweet: { 
        id: item.id_str,
        text: item.text,
        name: item.user.name,
        handle: '@'+item.user.screen_name,
        img: item.user.profile_image_url
      }
    }
  }

  Models.sortIndex = function (source, capture, target) {
  
    var breakpoint = source.splice(capture); // first value of breakpoint is capture
    
    // console.log('breakpoint',breakpoint);
    // console.log('source',source);

    var item = breakpoint.shift(); // remove first value and retain it

    var neworder = source.concat(breakpoint); // new source array with captured element removed

    neworder.splice(target, 0, item); // place captured into new target position

    return neworder

  }

  return Models

});