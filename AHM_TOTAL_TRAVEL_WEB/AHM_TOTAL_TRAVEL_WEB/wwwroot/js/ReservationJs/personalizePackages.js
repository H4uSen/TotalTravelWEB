//------------------------- MODELS VARIABLES ---------------------------

//extra
const PartnersList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Partners/List");
const AddressList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Address/List");
const CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
// hotels
const HotelsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Hotels/List");
const HotelsActivitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/HotelsActivities/List");
const RoomsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Rooms/List");

// activities
const ActivitiesExtraList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ActivitiesExtra/List");

// transports
const DetailsTransportationList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/DetailsTransportation/List");

//restaurants
const RestaurantsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Restaurants/List");
const MenusList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Menus/List");

//------------------------- VARIABLES ---------------------------

var data = {
    persons: 0,
    hotel: {
        id: 0,
        rooms: [
            { id: 0, count: 0 }
        ]
    },
    restaurant: 0,
    transport: 0,
    activities: [0],
};

const helpers = {
    hideAll: function () {
        var pantallas = [
            $("#hotel_container"),
            $("#activities_container"),
            $("#transport_container"),
            $("#restaurant_container"),
            $("#pago_container")
        ];

        $.each(pantallas, function (index, item) {
            $(item).hide();
        });
    },

    setStepDefault: function () {
        $.each($("#StepsContainer .step"), function (index, item) {
            $(item).removeClass("active");
            $(item).removeClass("completed");
            $(item).addClass("disabled");
        });
    }
}

const steps = {
    step_0: function () {
        $("#frmStepfooter button").prop("disabled", true);

        helpers.setStepDefault();
        $("#StepsProgressBar").css("width", "20%");
        $("#StepsContainer .step").eq(0).addClass("active").removeClass("disabled");
        helpers.hideAll();
        $("#hotel_container").show();
        $("#frmRooms").hide();
        $("#frmHotels").show();
    },

    step_1: function () {
        $('#main_content :input').attr('disabled', false);
        $('#main_content :button').attr('disabled', false);

        $("#frmStepfooter button").prop("disabled", true);

        // set default
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "20%");
        $("#StepsContainer .step").eq(0).addClass("active").removeClass("disabled");

        // show view
        helpers.hideAll();
        $("#hotel_container").show();
        $("#frmRooms").hide();
        $("#frmHotels").show();

        //buttons item events
        $("#frmHotels .hotel_item .hotel_button_trigger").click(function (_this_button) {
            console.log($(_this_button.target));

            //set default
            $("#frmHotels .hotel_item .hotel_button_trigger").removeClass("positive").addClass("primary");
            $("#frmHotels .hotel_item .hotel_button_trigger").html('RESERVAR <i class="right chevron icon"></i>');

            //set actual
            const id_hotel = $(_this_button.target).attr("data-value");
            $(_this_button.target).addClass("positive").removeClass("primary");
            $(_this_button.target).html('RESERVADO <i class="right chevron icon"></i>');

            
            if ($(_this_button.target).attr("data-selected") == "false") {
                $("#frmHotels .hotel_item .hotel_button_trigger").attr("data-selected", "false");
                $(_this_button.target).attr("data-selected", "true");
                fillRooms(id_hotel);
            }

            $("#frmRooms").show();
            $("#frmHotels").hide();
            
            $("#frmStepfooter button").prop("disabled", false);
        });

        // footer buttons events 
        $("#btnNextStep").attr("data-step", "step_2");
        $("#btnBeforeStep").attr("data-step", "step_0");
    },

    step_2: function () {

        $("#frmStepfooter button").prop("disabled", false);

        // set default
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "40%");
        $("#StepsContainer .step").eq(0).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(1).addClass("active").removeClass("disabled");

        // show wide
        helpers.hideAll();
        $("#activities_container").show();
        $("#frmExtraActivities").hide();
        $("#frmHotelActivities").show();

        // footer buttons events 
        $("#btnNextStep").attr("data-step", "step_3");
        $("#btnBeforeStep").attr("data-step", "step_1");

    },

    step_3: function () {
        // set default
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "60%");
        $("#StepsContainer .step").eq(0).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(1).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(2).addClass("active").removeClass("disabled");

        // show wide
        helpers.hideAll();
        $("#transport_container").show();
        $("#frmPortuarios").hide();
        $("#frmVuelos").hide();
        $("#frmTransportes").show();

        // footer buttons events 
        $("#btnNextStep").attr("data-step", "step_4");
        $("#btnBeforeStep").attr("data-step", "step_2");
    },

    step_4: function () {
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "80%");
        $("#StepsContainer .step").eq(0).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(1).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(2).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(3).addClass("active").removeClass("disabled");

        // show wide
        helpers.hideAll();
        $("#restaurant_container").show();

        // footer buttons events 
        $("#btnNextStep").attr("disabled", false);
        $("#btnNextStep").attr("data-step", "step_5");
        $("#btnBeforeStep").attr("data-step", "step_3");
    },

    step_5: function () {
        // set default
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "100%");
        $("#StepsContainer .step").eq(0).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(1).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(2).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(3).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(4).addClass("active").removeClass("disabled");

        // show wide
        helpers.hideAll();
        $("#pago_container").show();

        // footer buttons events 
        $("#btnNextStep").attr("disabled", true);
        $("#btnBeforeStep").attr("data-step", "step_4");
    }
}


//------------------------- INIZIALIZE ---------------------------
$('#main_content :input').attr('disabled', true);
$('#main_content :button').attr('disabled', true);
steps.step_0();
createContador($(".contador"));

// fechas 
$('#txtFechaEntrada').calendar({
    type: 'date',
    endCalendar: $('#txtFechaSalida')
});

$('#txtFechaSalida').calendar({
    type: 'date',
    startCalendar: $('#txtFechaEntrada')
});

$('.activities_fecha').calendar({
    type: 'date',
    popupOptions: {
        position: 'bottom right',
        lastResort: 'bottom right',
        hideOnScroll: false
    }
});

$('.restaurant_fecha').calendar({
    type: 'date',
    popupOptions: {
        position: 'bottom right',
        lastResort: 'bottom right',
        hideOnScroll: false
    }
});


$('.ui.dropdown').dropdown();

//-------------------------- EVENTS ------------------------------------------

$("#frmTransporte_menu .item").click(function (_this) {
    $("#frmTransporte_menu .item").removeClass("active");
    $(_this.target).addClass("active");

    $.each($("#frmTransporte_menu .item"), (i, item) => {
        const object = $(item).attr("data-target");
        $(`#transport_container ${object}`).hide();
    });

    const wideToShow = $(_this.target).attr("data-target");
    $(wideToShow).show();
});

$("#frmActivities_menu .item").click(function (_this) {
    $("#frmActivities_menu .item").removeClass("active");
    $(_this.target).addClass("active");

    $.each($("#frmActivities_menu .item"), (i, item) => {
        const object = $(item).attr("data-target");
        $(`#activities_container ${object}`).hide();
    });

    const wideToShow = $(_this.target).attr("data-target");
    $(wideToShow).show();
});

$("#btnNextStep").click(function (_this) {
    var step = $(_this.target).attr("data-step");
    steps[step]();
});

$("#btnBeforeStep").click(function (_this) {
    var step = $(_this.target).attr("data-step");
    steps[step]();
});

$(".menu_trigger_button").click(function () {
    $('#mdlMenus').modal('show');
});

$("#cbbCiudadDestino").change(function (_this) {
    if ($(_this.target).val() != 0) {
        fillMain($(_this.target).val());
    }
});

//-------------------------- FUNCTIONS CONTADOR ------------------------------------------

function createContador(querySelector) {

    $.each(querySelector, function (index, object) {
        var _this = $(object);
        var plusButton = _this.find(".plus_button");
        var minusButton = _this.find(".minus_button");
        var countInput = _this.find(".count_input");

        $(plusButton).click(function () {
            contador($(countInput), true, cero = false)
        });

        $(minusButton).click(function () {
            contador($(countInput), false, cero = false)
        });
    });
}

function contador(input, mode, cero = false) {
    var numero = parseInt($(input).val());

    if (!cero) {
        if (numero >= 1) {
            if (mode == true) {
                numero++;
            } else if (mode == false && numero > 1) {
                numero--;
            }
        }
        else {
            numero = 1;
        }
    }
    else if (cero) {
        if (numero >= 0) {
            if (mode == true) {
                numero++;
            } else if (mode == false && numero > 0) {
                numero--;
            }
        }
        else {
            numero = 0;
        }
    }
    $(input).val(numero);
}

//-------------------------- MAIN FUNCTIONS PAGE ------------------------------------------

function fillMain(id_ciudad){
    fillHotels(id_ciudad);
    steps.step_1();
}

function fillHotels(id_ciudad){

    if (HotelsList.code == 200) {
        const ciudad = jQuery.grep(CitiesList.data, function (item, i) {
            return item.id == id_ciudad;
        })[0];

        const hotels = jQuery.grep(HotelsList.data, function (item, i) {
            return item.ciudadID == id_ciudad;
        });

        $("#hotel_container #frmHotels #frmItems").empty();
        for (var i = 0; i < hotels.length; i++) {
            const hotel = hotels[i];
            const hotelImage = hotel.image_URL.split(",");

            const card =
                ` <div class="item hotel_item">
                    <div class="image">
                        <img src="${hotelImage[0]}">
                    </div>
                    <div class="content">
                        <h3><b>${hotel.hotel}</b></h3>
                        <h5 class="blue_text">
                            <i class="map marker alternate blue icon"></i>
                            <b>${ciudad.ciudad}, ${ciudad.pais}</b>
                        </h5>
                        <div class="extra">
                            <b>Rating:</b><br>
                            <div class="ui huge star rating disabled" data-rating="5"></div>
                        </div>
                    </div>
                    <div class="content left floated" style="text-align: end;">
                        <br>
                        <button class="ui right floated primary button hotel_button_trigger" data-value="${hotel.id}" data-selected="false">
                            RESERVAR <i class="right chevron icon"></i>
                        </button>
                    </div>
                </div>`;

            $("#hotel_container #frmHotels #frmItems").append(card);
        }

        // ratings
        $('.rating').rating({
            initialRating: 2,
            maxRating: 5
        });

        $('.rating.disabled').rating({
            initialRating: 2,
            maxRating: 5
        }).rating('disable');
    }
}

function fillRooms(id_hotel){
    console.log("id_hotel: " + id_hotel);
}