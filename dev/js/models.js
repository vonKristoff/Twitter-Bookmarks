define([], function (){

  var Models = {
    handle:'',
    raw:[],
    local:[],
    live:[]
  };

  var tweet = {
    id:'',
    order:'',
    text:'',
    name:'',
    screen_name:'',
    profile_image_url:''
  }

  Models.filter = function (item){
    // construct object from raw tweet
    return {
      tweet: { 

      }
    }
  }

  return Models

});