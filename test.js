// var settings = {
//     "async": true,
//     "crossDomain": true,

//     "method": "POST",

//   }

//   $.ajax(settings).done(function (response) {
//     console.log(response.screenshots);
//   });

// $.ajax({
//     url: "https://api-v3.igdb.com/games/",
//     method: "POST",
//     headers: {
//         "user-key": "5a22b8c4073d2f0d885f503903f53635",
//     },
    
//     data:
//         "fields name; where platforms = 48;exclude tags;"
//     ,
//     success: function (res) {
//         callback(res);
//     }
// });




let doodad = "ef77360c75de1c722453c99cebf0f44843f09d27";

// //reviews
// $.ajax({
//     type: 'GET',
//     dataType: 'jsonp',
//     crossDomain: true,
//     jsonp: 'json_callback',
//     url: `http://www.giantbomb.com/api/reviews/?format=jsonp&api_key=${doodad}&limit=10&filter=score:5`,
//     complete: function () {
//         console.log('done');
//     },
//     success: function (data) {
//         console.log(data);
//     }
// });

//PS4 ID = 146
//XBOX One ID = 145
//PC ID = 94
//Switch ID = 157

$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: `http://www.giantbomb.com/api/games/?format=jsonp&api_key=${doodad}&filter=platforms:94,expected_release_year:2019,expected_release_month:10`,
    complete: function () {
        console.log('done');
    },
    success: function(data) {
        console.log(data);
        console.log(data.results)
        let arr = data.results
        function renderGames(array){
            let gameHTML = array.map(function(thing){
                let gameName = `<div>${thing.name}</div>
                <div>${thing.deck}</div>
                <div><img src="${thing.image.small_url}"></div>`
                return gameName
            }).join("")
            return gameHTML
        }
        
        function renderStuff(){
            let content = $("#test").html(renderGames(arr))
        }
        
        renderStuff();
        

    }
});
