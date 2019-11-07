// var settings = {
//     "async": true,
//     "crossDomain": true,
   
//     "method": "POST",
    
//   }
  
//   $.ajax(settings).done(function (response) {
//     console.log(response.screenshots);
//   });

$.ajaxSetup({
    "headers": {
        "user-key": "5a22b8c4073d2f0d885f503903f53635",
      },
      "data": "fields screenshots.*; where id = 1942;",
})


$.post("https://api-v3.igdb.com/games/", function (response){
    console.log(response.screenshots);
})