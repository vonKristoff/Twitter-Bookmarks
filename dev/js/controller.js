define(['underscore','models'], function (_, Models){
  
 var Controller = { root: {} };

 Controller.update = function (data){
    
    Controller.root = this; // root app scope so render can be called (passed in from call)

    // data.favourites.forEach(function (item, i){
    //   // filter each tweet to our app model
    //   Models.raw.push(Models.filter(item));
    // })
      
    // Controller.checkDB(data.handle);

    Controller.checkDB('vonKristoff') // debug
 
 }

 Controller.checkDB = function (handle){
    
    // set current user
    Models.handle = handle;

    // does user exist?

    var storage = localStorage.getItem(handle);

    if(storage != null){
      console.log('welcome back');
      // we have already used this handle
      Models.local = JSON.parse(storage);

    } else {
      // create new handle key in local storage
      localStorage.setItem(handle, JSON.stringify(Models.raw));
      // duplicate new tweets array into local storage array
      Models.local = Models.raw.slice();
    }

    // sort live model based on merge of new tweets and previously stored
    // update db based on any new tweets
    
    this.buildLiveModel()

  }
  Controller.buildLiveModel = function (){

    // live is built from testing differences in order of tweet ids between local and raw arrays
    // local order takes president but any new ids pop older tweets from local array

    // create an order array
    for(var i=0;i<Models.local.length;i++){  
      Models.order.push(Models.local[i].tweet.id);
    }

    var temp = [];
    // create a difference array
    for(var i=0;i<Models.raw.length;i++){  
      temp.push(Models.raw[i].tweet.id);
    }

    // retrieve any non matching items - ie they are new tweets that need to be unshifted into the existing order (keeping them at the top)
    var newTweets = _.difference(temp, Models.order);
    var newNum = newTweets.length;

    // duplicate local storage array
    Models.live = Models.local.slice();

    // unshift new values into live array
    for(var i=0;i<newNum;i++){
      Models.live.unshift(Models.raw[i])
    }
  
    // remove values if length is over 24
    if((Models.live.length-1) >= 24) Models.order.splice((Models.live.length-1) - newNum, newNum);

    // we have an updated live array - save it to localstorage
    // localStorage.setItem(Models.handle, JSON.stringify(Models.live));

    // ok, render that view
    this.root.render();
  }

  Controller.Dragging = {
    capture:0,
    target:0,
    is: false
  }  

  Controller.startDrag = function (){
    Controller.Dragging.is = true;
  }
  Controller.endDrag = function (){
    var drag = this.Dragging;
    Controller.Dragging.is = false;
    if(drag.capture != drag.target){

      // rearrange Models.live
      Models.live = Models.sortIndex(Models.live.slice(), drag.capture, drag.target);
      
      // save the data to localStorage
      // localStorage.setItem(Models.handle, JSON.stringify(Models.live)); 

      // update the view
      this.root.render(drag.target+1);
    }
    
  }

  // clean storage
  Controller.kill = function (){
    localStorage.clear();
  }

  return Controller

 })