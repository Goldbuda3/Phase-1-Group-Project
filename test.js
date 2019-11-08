let doodad = "ef77360c75de1c722453c99cebf0f44843f09d27";

$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: `http://www.giantbomb.com/api/search/?format=jsonp&api_key=${doodad}&query=uncharted`,
    complete: function () {
        console.log('done');
    },
    success: function (data) {
        console.log(data);
    }
});