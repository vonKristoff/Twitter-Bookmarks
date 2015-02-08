define(['models'], function (Models){
  
 var Controller = {};

 Controller.update = function (data){
    
    data.favourites.forEach(function (item, i){
      // console.log(item, i);
      // filter each tweet to our app model
      // Models.raw.push(Models.filter(item));
    })
      
    
    Controller.checkDB(data.handle)
 }

 


  return Controller

 })