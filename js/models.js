define([], function (){

  var Models = {
    handle:'',  // user name
    raw:[],     // incoming tweets from twitter, filtered down to app use case
    local:[],   // what we have previously stored
    live:[]     // live scope to reorder within as well as render from
  };

  Models.filter = function (item, i){
    // construct object from raw tweet, taking the things we need
    // nb keeping it basic for use with Transparency render
    return {
      tweet: { 
        id: item.id_str,
        order: i, // order ref from array index
        text: item.text,
        name: item.user.name,
        handle: '@'+item.user.screen_name,
        img: item.user.profile_image_url
      }
    }
  }

  return Models

});