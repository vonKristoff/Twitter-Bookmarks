define(['models'], function (Models){
  
 var Controller = {};

 Controller.update = function (data){
    
    data.favourites.forEach(function (item, i){
      // console.log(item, i);
      // filter each tweet to our app model
      console.log(Models.filter(item));
      // Models.raw.push(Models.filter(item));
    })
      
    
    Controller.checkDB(data.handle)
 }

 Controller.checkDB = function (handle){
    
    // set current user
    Models.handle = handle;

    // does user exist?

    var storage = localStorage.getItem(handle);

    if(storage != null){
      // we have already used this handle
      Models.local = JSON.parse(storage)
    } else {
      console.log('creating new storage object');
      // create new handle key in local storage
      localStorage.setItem(handle, JSON.stringify(Models.raw));
    }

    // clearing for now
    localStorage.clear();
  }


  return Controller

 })