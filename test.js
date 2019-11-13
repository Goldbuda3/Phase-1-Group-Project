//PS4 ID = 146
//XBOX One ID = 145
//PC ID = 94
//Switch ID = 157

//Grabbing stuff based on platform and MM/YYYY

$(document).ready(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "MM yy",
        showButtonPanel: true,
        hideIfNoPrevNext: true,
        onClose: function () {
            var mon = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var yr = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(yr, mon, 1));
            var gameMonth = parseInt(mon, 10);
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'json_callback',
                url: `http://www.giantbomb.com/api/games/?format=jsonp&api_key=ef77360c75de1c722453c99cebf0f44843f09d27&filter=platforms:94,expected_release_year:${yr},expected_release_month:${gameMonth + 1}`,
                complete: function () {
                    console.log('done');
                },
                success: function (data) {
                    let arr = data.results
                    function renderGames(array) {
                        let gameHTML = array.map(function (thing) {
                            let gameName = `
                            <div class="flip-card">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="image-container">
                                            <img src="${thing.image.small_url}" alt="Avatar"">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <h5>${thing.name}</h5>
                                        <p class="deck">${thing.deck}</p>
                                        <button class="${thing.name}" id="openVideo" onClick="showVideo(event)"><a href="#">See Videos</a></button>
                                    </div>
                                </div>
                            </div>
                            `
                            return gameName;
                        }).join("");
                        return gameHTML;
                    }
                    $(".container-card").html(renderGames(arr));
                }
            });
        },
        beforeShow: function () {
            if ((theDate = $(this).val()).length > 0) {
                iYear = theDate.substring(theDate.length - 4, theDate.length);
                iMonth = jQuery.inArray(theDate.substring(0, theDate.length - 5), $(this).datepicker('option', 'monthNames'));
                $(this).datepicker('option', 'defaultDate', new Date(iYear, iMonth, 1));
                $(this).datepicker('setDate', new Date(iYear, iMonth, 1));
            }
        }
    }).focus(function () {
        $(".ui-datepicker-next").hide();
        $(".ui-datepicker-prev").hide();
    });;
    $("#accordion").accordion({
        heightStyle: "content",
        collapsible: true,
    });
});
var toggler = true;
function showVideo(event) {
    let grabGameName = event.target.className;
    let nameURI = encodeURI(grabGameName);
    $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${nameURI + "%20game"}&key=AIzaSyDW0P2VOx9KRYOcxAEGFumAYv4WPdw6-L8`).then(function (response) {
        let vidArr = response.items;
                    function renderVideos(array) {
                        let videoHTML = array.map(function (thing) {
                            let gameVideo = `
                            <div class="card">
                                <img class="card-img-top" src="${thing.snippet.thumbnails.default.url}">
                                <div class="card-body">
                                    <h5 class="card-title">${thing.snippet.title}</h5>
                                    <h7 class="card-text"><strong>${thing.snippet.channelTitle}</strong></h7>
                                    <p class="card-text">${thing.snippet.description}</p>
                                    <a href="https://www.youtube.com/watch?v=${thing.id.videoId}" class="btn btn-primary" target="_blank">View Video</a>
                                </div>
                            </div>
                            `
                            return gameVideo;
                        }).join("");
                        return videoHTML;
                    }
                    $(".container-video").html(renderVideos(vidArr));
    });
    if (toggler == true) {
        toggler = false;
        $("#gameHeader").removeClass("ui-accordion-header-active ui-state-active").addClass("ui-accordion-header-collapsed ui-corner-all");
        $("#vidHeader").removeClass("ui-accordion-header-collapsed ui-corner-all").addClass("ui-accordion-header-active ui-state-active");
        $("#cards").removeClass("ui-accordion-content-active").css("display", "none");
        $("#vids").addClass("ui-accordion-content-active").removeAttr("style");
        return toggler;
    };
};
$("#showMoreGames").click(function () {
    toggler = true;
    $("#vidHeader").removeClass("ui-accordion-header-active ui-state-active").addClass("ui-accordion-header-collapsed ui-corner-all");
    $("#gameHeader").removeClass("ui-accordion-header-collapsed ui-corner-all").addClass("ui-accordion-header-active ui-state-active");
    $("#vids").removeClass("ui-accordion-content-active").css("display", "none");
    $("#cards").addClass("ui-accordion-content-active").removeAttr("style");
    return toggler;
});