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
                            let gameName = `
            
                            <div class="flip-card">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div class="image-container">
                                            <img src="${thing.image.super_url}" alt="Avatar"">
                                        </div>
                                    </div>
                                    <div class="flip-card-back">
                                        <h1>${thing.name}</h1>
                                        <p>${thing.deck}</p>
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
});





// $.get("https://api.bestbuy.com/v1/products((search=Indivisible)&(categoryPath.id=pcmcat295700050012))?apiKey=7OKoNjvIWrA9haGpaqBtgXAl&pageSize=1&format=json").then(function (response) {
//     console.log(response);

//     let arr = response
//     function renderGames(response) {
//         let gameName = `<div><a href="${response.products[0].addToCartUrl}">${response.products[0].name}</a></div>


//                 <div><img src="${response.products[0].image}"></div>

//                 <div>$${response.products[0].regularPrice}</div>`

//         return gameName
//     }

//     function renderStuff() {
//         let content = $("#test").html(renderGames(arr))
//     }

//     renderStuff();


// })