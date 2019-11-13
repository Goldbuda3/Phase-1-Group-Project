let doodad = "ef77360c75de1c722453c99cebf0f44843f09d27";

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

        onClose: function () {
            var mon = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            console.log(mon)
            var yr = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            console.log(yr)
            $(this).datepicker('setDate', new Date(yr, mon, 1));
            var gameMonth = parseInt(mon, 10)
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'json_callback',
                url: `http://www.giantbomb.com/api/games/?format=jsonp&api_key=${doodad}&filter=platforms:94,expected_release_year:${yr},expected_release_month:${gameMonth + 1}`,
                complete: function () {
                    console.log('done');
                },
                success: function (data) {
                    console.log(data);
                    console.log(data.results)
                    let arr = data.results
                    function renderGames(array) {
                        let gameHTML = array.map(function (thing) {
                            // let nameURI = encodeURI(`${thing.name}`)
                            // $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${nameURI}&key=AIzaSyDW0P2VOx9KRYOcxAEGFumAYv4WPdw6-L8`).then(function (response) {
                            //         let gameBuy = `<div><a href="${response.products[0].addToCartUrl}"><button>Search for ${thing.name} videos</button></a></div>`
                            //         $("#buyButton").html(gameBuy);
                            //                  return gameBuy;
                            //         }
                            // );
                        
                        let gameName = `
                            <div class="flip-card">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="image-container">
                                            <img src="${thing.image.small_url}" alt="Avatar"">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <h1>${thing.name}</h1>
                                        <p>${thing.deck}</p>
                                        <div id="buyButton"></div>
                                    </div>
                                </div>
                            </div>
                            `
                            return gameName
                        }).join("")
                        return gameHTML
                    }


                    $(".container-card").html(renderGames(arr))



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
    });


    $( "#accordion" ).accordion({
        heightStyle: "content",
        collapsible: true,
    });
    var toggler = true
    $("#openVideo").click(function(){
        if (toggler == true){
            toggler = false;
        $("#gameHeader").removeClass("ui-accordion-header-active ui-state-active").addClass("ui-accordion-header-collapsed ui-corner-all");
        $("#vidHeader").removeClass("ui-accordion-header-collapsed ui-corner-all").addClass("ui-accordion-header-active ui-state-active");
        $("#cards").removeClass("ui-accordion-content-active").css("display", "none");
        $("#vids").addClass("ui-accordion-content-active").removeAttr("style");
        console.log(toggler)
        return toggler;
        }
        else {
            toggler = true;
        $("#vidHeader").removeClass("ui-accordion-header-active ui-state-active").addClass("ui-accordion-header-collapsed ui-corner-all");
        $("#gameHeader").removeClass("ui-accordion-header-collapsed ui-corner-all").addClass("ui-accordion-header-active ui-state-active");
        $("#vids").removeClass("ui-accordion-content-active").css("display", "none");
        $("#cards").addClass("ui-accordion-content-active").removeAttr("style");
        console.log(toggler)
        return toggler;
        }
    })



    let yTKey = "AIzaSyDW0P2VOx9KRYOcxAEGFumAYv4WPdw6-L8";

    $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=death%20stranding&key=${yTKey}`).then(function (response) {
      console.log(response)
    })


/*     <h3 id="gameHeader">Games</h3>
        <div class='container-card' id="cards">
        </div>
        <h3 id="vidHeader">Videos</h3>
        <div class="videos" id="vids">
        </div> 
    */


// //active
// //header
// ui-accordion-header-active ui-state-active
// //content
// ui-accordion-content-active
// //collapsed
// //header
// ui-accordion-header-collapsed ui-corner-all
// //content
// style="display: none;"

});