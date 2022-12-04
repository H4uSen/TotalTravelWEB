//------------------------- MODELS VARIABLES ---------------------------

//extra
//const PartnersList = ajaxRequest(urlAPI+"/API/Partners/List");
var CitiesList = ajaxRequest(urlAPI +"/API/Cities/List");
// hotels
var HotelsList = ajaxRequest(urlAPI +"/API/Hotels/List");
var HotelsActivitiesList = ajaxRequest(urlAPI +"/API/HotelsActivities/List");
var RoomsList = ajaxRequest(urlAPI +"/API/Rooms/List");

// activities
var ActivitiesExtraList = ajaxRequest(urlAPI +"/API/ActivitiesExtra/List");

// transports
var DetailsTransportationList = ajaxRequest(urlAPI +"/API/DetailsTransportation/List");

//restaurants
var RestaurantsList = ajaxRequest(urlAPI +"/API/Restaurants/List");
var MenusList = ajaxRequest(urlAPI +"/API/Menus/List");

//------------------------- VARIABLES ---------------------------

const helpers = {
    hideAll: function () {
        var pantallas = [
            $("#hotel_container"),
            $("#activities_container"),
            $("#transport_container"),
            $("#restaurant_container"),
            $("#pago_container"),
            $("#state_container")
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

        $("#frmActivities_menu .item").removeClass("active");
        $("#frmActivities_menu .item").eq(0).addClass("active");
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

        $("#frmTransporte_menu .item").removeClass("active");
        $("#frmTransporte_menu .item").eq(0).addClass("active");
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

        getReservationDetail();

        // footer buttons events 
        $("#btnNextStep").attr("disabled", true);
        $("#btnBeforeStep").attr("data-step", "step_4");
    },

    success: function (successAction) {
        // set default
        helpers.setStepDefault();

        // set actual step
        $("#StepsProgressBar").css("width", "100%");
        $("#StepsContainer .step").eq(0).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(1).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(2).removeClass("disabled").addClass("completed");
        $("#StepsContainer .step").eq(3).removeClass("disabled").addClass("completed");

        helpers.hideAll();
        $("#state_container").show();
        if (successAction) {
            $("#StepsContainer .step").eq(4).addClass("completed").removeClass("disabled");
            $("#state_container #error_alert").hide();
            $("#state_container #success_alert").show();
            $("#frmStepfooter button").prop("disabled", true);
        } else {
            $("#state_container #success_alert").hide();
            $("#state_container #error_alert").show();
        }
    }
}


//------------------------- INIZIALIZE ---------------------------
$('#main_content :input').attr('disabled', true);
$('#main_content :button').attr('disabled', true);
steps.step_0();
createContador($(".contador"),false);

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
$('.ui.accordion').accordion();

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
    if ($("#cbbCiudadDestino").val() != 0) {
        fillMain(
            $("#cbbCiudadResidencia").val(),
            $("#cbbCiudadDestino").val()
        );
    }
});

$("#cbbCiudadResidencia").change(function (_this) {
    if ($("#cbbCiudadDestino").val() != 0) {
        fillMain(
            $("#cbbCiudadResidencia").val(),
            $("#cbbCiudadDestino").val()
        );
    }
});

//-------------------------- FUNCTIONS CONTADOR ------------------------------------------

function createContador(querySelector,startInCero = false) {

    $.each(querySelector, function (index, object) {
        var _this = $(object);
        var plusButton = _this.find(".plus_button");
        var minusButton = _this.find(".minus_button");
        var countInput = _this.find(".count_input");

        $(plusButton).click(function () {
            contador($(countInput), true, startInCero)
        });

        $(minusButton).click(function () {
            contador($(countInput), false, startInCero)
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

function fillMain(id_ciudad_salida, id_ciudad_destino){
    fillHotels(id_ciudad_destino);
    fillExtraActivities(id_ciudad_destino);
    fillTransport(id_ciudad_salida, id_ciudad_destino)
    fillRestaurant(id_ciudad_destino);
    steps.step_1();
}


//--------------------------------- FILL FUNCTIONS ------------------------------------------
function fillHotels(id_ciudad){

    CitiesList = ajaxRequest(urlAPI +"/API/Cities/List");

    if (HotelsList.code == 200) {
        const ciudad = jQuery.grep(CitiesList.data, function (item, i) {
            return item.id == id_ciudad;
        })[0];

        const hotels = jQuery.grep(HotelsList.data, function (item, i) {
            return item.ciudadID == id_ciudad;
        });

        $("#hotel_container #frmHotels #frmItems").empty();
        if (hotels.length > 0) {
            for (var i = 0; i < hotels.length; i++) {

                const hotel = hotels[i];
                const hotelImage = hotel.image_URL.split(",");

                // caroulse contruct
                var carousel = `<div class="fotorama hotels_fotorama" data-allowfullscreen="true" data-nav="thumbs" data-width="100%">`;
                for (var j = 0; j < hotelImage.length; j++) {
                    carousel += `<img src="${hotelImage[j]}">`;
                }
                carousel += "</div>";

                const card =
                    `<div class="item hotel_item">
                        <div class="image">
                            ${carousel}
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

            // INIZIALIZE OBJECT
            $("#frmHotels .hotel_item .hotel_button_trigger").click(function (_this_button) {

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
                    fillHotelActivities(id_hotel);
                }

                $("#frmRooms").show();
                $("#frmHotels").hide();

                $("#frmStepfooter button").prop("disabled", false);
            });

            $('.rating').rating({
                initialRating: 2,
                maxRating: 5
            });

            $('.rating.disabled').rating({
                initialRating: 2,
                maxRating: 5
            }).rating('disable');

            $(".hotels_fotorama").fotorama();

        } else {
            $("#hotel_container #frmHotels #frmItems").append(
                `<div class="item">
                    <div class="content">
                        <div class="ui negative message">
                            <div class="header">
                                No hay hoteles disponibles en esta zona
                            </div>
                            <p>
                                Selecciona una ciudad para empezar tu busqueda
                            </p>
                        </div>
                    </div>
                </div>`);
        }
    }
}

function fillRooms(id_hotel) {

    if (RoomsList.code == 200) {
        const rooms = jQuery.grep(RoomsList.data, function (item, i) {
            return item.hotelID == id_hotel;
        });

        $("#hotel_container #frmRooms").empty();
        if (rooms.length > 0) {
            
            for (var i = 0; i < rooms.length; i++) {

                const item = rooms[i];
                const images = item.imageUrl.split(",");
                
                // carousel construct
                var carousel = `<div class="fotorama rooms_fotorama" data-allowfullscreen="true" data-nav="thumbs" data-width="100%" data-height="300">`;
                for (var j = 0; j < images.length; j++) {
                    carousel += `<img src="${images[j]}">`;
                }
                carousel += "</div>";

                //details list
                var details = `<h6 style="font-weight:bold;">- Capacidad para ${item.capacidad} personas</h6>`;
                if (item.balcon) {
                    details += "<h6>- Vista de balcon</h6>";
                }
                if (item.wifi) {
                    details += "<h6>- Conexion WI-FI</h6>";
                }

                // room card construct
                const card =
                    `<div class="column room_item" data-value="${item.id}">
                        <div class="ui card" style="width:100%; height:100%;">
                            <div class="image">
                               ${carousel}
                            </div>
                            <div class="content">
                                <a class="header">
                                    <h3>
                                        <b>${item.habitacion}</b>
                                        <div class="ui large gray horizontal label">${item.categoria}</div>
                                    </h3>
                                </a>
                                <h5 class="description">${item.descripcion} </h5>

                                <div class="extra">
                                    <h5 class="blue_text">Detalles adicionales</h5>
                                    ${details}
                                    <br>
                                    <b>Rating:</b><br>
                                    <div class="ui huge star rating disabled" data-rating="5"></div>
                                </div><br>
                                <div class="ui labeled large button" tabindex="0">
                                    <div class="ui green button">
                                        <i class="tag icon"></i> Precio
                                    </div>
                                    <h3 class="ui basic left pointing label">
                                        Lps. ${parseFloat(item.precio).toFixed(2)}
                                    </h3>
                                </div>

                            </div>
                            <div class="extra content" style="text-align: end;">
                                <div class="field">
                                     <div class="ui right labeled input room_contador" style="width: 100%;">
                                        <div class="ui icon button label minus_button">
                                            <i class="minus icon"></i>
                                        </div>
                                        <input class="count_input" type="number" value="0"
                                               style="text-align: center;" readonly>
                                        <div class="ui icon button label plus_button">
                                            <i class="plus icon"></i>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>`;

                $("#hotel_container #frmRooms").append(card);
            }

            //inizialize objects
            createContador($(".room_contador"),true);
            $(".rooms_fotorama").fotorama();
            $('.rating').rating({
                initialRating: 2,
                maxRating: 5
            });
        }
        else {
            $("#hotel_container #frmRooms").append(
                `<div class="item">
                    <div class="content">
                        <div class="ui negative message">
                            <i class="close icon"></i>
                            <div class="header">
                                No hay habitaciones disponibles en este hotel
                            </div>
                        </div>
                        <a class="ui left floated button" href="javascript: steps.step_0() ">
                            <i class="left chevron icon"></i> VOLVER
                        </a>
                    </div>
                </div>`);
        }

    }
}

function fillExtraActivities(id_ciudad) {
    if (ActivitiesExtraList.code == 200) {

        const activities = jQuery.grep(ActivitiesExtraList.data, function (item, i) {
            return item.ciudadID == id_ciudad;
        });

        $("#activities_container #frmExtraActivities .ui.items").empty();
        if (activities.length > 0) {

            for (var i = 0; i < activities.length; i++) {

                const item = activities[i];
                const images = item.imageURL.split(",");

                //carousel construct
                var carousel =
                    `<div class="fotorama activities_fotorama" data-allowfullscreen="true" data-nav="thumbs">`;
                for (var j = 0; j < images.length; j++) {
                    carousel += `<img src="${images[j]}">`;
                }
                carousel += "</div>";

                const card =
                    `<div class="item activity_item" data-value='${item.id}'>
                    <div class="image">
                        ${carousel}
                    </div>
                    <div class="content" style="padding-right: 10em;">
                        <h3>
                            <b class="blue_text">${item.actividad}</b>
                            <div class="ui large gray horizontal label">${item.tipoActividad}</div>
                        </h3>
                        <h4><b>${item.partner}</b></h4>
                        <div class="description">
                            ${item.descripcion}
                        </div>
                        <div class="extra">
                            <h3 class="ui green header">L ${parseFloat(item.precio).toFixed(2)} por persona</h3>
                        </div>
                    </div>
                    <div class="content left floated activitiesExtra_form_content">
                        <div class="fields">

                            <div class="field">
                                <label>No. de personas</label>
                                <div class="field">
                                    <div class="ui right labeled input ExtraActivity_contador">
                                        <div class="ui icon button label minus_button">
                                            <i class="minus icon"></i>
                                        </div>
                                        <input class="count_input" type="number" value="1" style="text-align: center;" readonly>
                                        <div class="ui icon button label plus_button">
                                            <i class="plus icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="field required">
                                <label>Fecha reservacion</label>
                                <div class="ui calendar activities_fecha">
                                    <div class="ui input left icon">
                                        <i class="calendar icon"></i>
                                        <input type="text" placeholder="Fecha de reservacion" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br>
                        <button class="ui right floated primary button activity_trigger_button" data-selected="false" data-value="${item.id}">
                            RESERVAR
                            <i class="right chevron icon"></i>
                        </button>
                    </div>
                </div>`;

                $("#activities_container #frmExtraActivities .ui.items").append(card);
            }

            // INIZIALIZE EVENTS
            $("button.activity_trigger_button").click(function (_this) {

                const id_actividad = $(_this.target).attr("data-value");

                if ($(_this.target).attr("data-selected") == "true") {

                    $(_this.target).addClass("primary").removeClass("positive");
                    $(_this.target).html('RESERVAR <i class="right chevron icon"></i>');
                    $(_this.target).attr("data-selected", "false");

                }
                else {

                    $(_this.target).addClass("positive").removeClass("primary");
                    $(_this.target).html('RESERVADO <i class="right chevron icon"></i>');;
                    $(_this.target).attr("data-selected", "true");

                }
            });
            $(".activities_fotorama").fotorama();
            createContador($(".ExtraActivity_contador"));
            $('.activities_fecha').calendar({
                //type: 'date',
                popupOptions: {
                    position: 'bottom right',
                    lastResort: 'bottom right',
                    hideOnScroll: false
                }
            });

        } else {
            $("#activities_container #frmExtraActivities .ui.items").append(
                `<div class="item">
                    <div class="content">
                        <div class="ui negative message">
                            <div class="header">
                                No hay actividades turisticas disponibles en esta ciudad
                            </div>
                        </div>
                    </div>
                </div>`
            );
        }

    }
}

function fillHotelActivities(id_hotel) {
    if (HotelsActivitiesList.code == 200) {

        const activities = jQuery.grep(HotelsActivitiesList.data, function (item, i) {
            return item.iD_Hotel == id_hotel;
        });

        $("#activities_container #frmHotelActivities .ui.items").empty();
        if (activities.length > 0) {

            for (var i = 0; i < activities.length; i++) {

                const item = activities[i];
                const images = item.image_URL.split(",");

                //carousel construct
                var carousel =
                    `<div class="fotorama activitiesHotels_fotorama" data-allowfullscreen="true" data-nav="thumbs">`;
                for (var j = 0; j < images.length; j++) {
                    carousel += `<img src="${images[j]}">`;
                }
                carousel += "</div>";

                const card =
                    `<div class="item activity_item" data-value="${item.id}">
                        <div class="image">
                            ${carousel}
                        </div>
                        <div class="content" style="padding-right: 10em;">
                            <h3>
                                <b class="blue_text">${item.actividad}</b>
                                <div class="ui large gray horizontal label">Familiar</div>
                            </h3>
                            <h4><b>${item.hotelNombre}</b></h4>
                            <div class="description">
                                ${item.descripcion}
                            </div>
                            <div class="extra">
                                <h3 class="ui green header">L ${parseFloat(item.precio).toFixed(2)} por persona</h3>
                            </div>
                        </div>
                        <div class="content left floated hotelActivity_form_data">
                            <div class="fields">

                                <div class="field">
                                    <label>No. de personas</label>
                                    <div class="field">
                                        <div class="ui right labeled input hotelActivity_contador">
                                            <div class="ui icon button label minus_button">
                                                <i class="minus icon"></i>
                                            </div>
                                            <input class="count_input" type="number" value="1" style="text-align: center;" readonly>
                                            <div class="ui icon button label plus_button">
                                                <i class="plus icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="field required">
                                    <label>Fecha reservacion</label>
                                    <div class="ui calendar activitiesHotels_fecha">
                                        <div class="ui input left icon">
                                            <i class="calendar icon"></i>
                                            <input type="text" placeholder="Fecha de reservacion" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br>
                            <button class="ui right floated primary button activityHotel_trigger_button" data-selected="false" data-value="${item.id}">
                                RESERVAR
                                <i class="right chevron icon"></i>
                            </button>
                        </div>
                    </div>`;

                $("#activities_container #frmHotelActivities .ui.items").append(card);
            }

            // INIZIALIZE EVENTS
            $("button.activityHotel_trigger_button").click(function (_this) {

                const id_actividad = $(_this.target).attr("data-value");

                if ($(_this.target).attr("data-selected") == "true") {

                    $(_this.target).addClass("primary").removeClass("positive");
                    $(_this.target).html('RESERVAR <i class="right chevron icon"></i>');
                    $(_this.target).attr("data-selected", "false");

                }
                else {

                    $(_this.target).addClass("positive").removeClass("primary");
                    $(_this.target).html('RESERVADO <i class="right chevron icon"></i>');;
                    $(_this.target).attr("data-selected", "true");

                }

            });
            $(".activitiesHotels_fotorama").fotorama();
            createContador($(".hotelActivity_contador"));
            $('.activitiesHotels_fecha').calendar({
                //type: 'date',
                popupOptions: {
                    position: 'bottom right',
                    lastResort: 'bottom right',
                    hideOnScroll: false
                }
            });

        } else {
            $("#activities_container #frmHotelActivities .ui.items").append(
                `<div class="item">
                    <div class="content">
                        <div class="ui negative message">
                            <div class="header">
                                No hay actividades turisticas disponibles en este hotel
                            </div>
                        </div>
                    </div>
                </div>`
            );
        }

    }
}

function fillTransport(id_ciudad_salida, id_ciudad_llegada) {

    var transports = jQuery.grep(DetailsTransportationList.data, function (item, i) {
        return item.ciudad_Salida_ID == id_ciudad_salida && item.ciudad_Llegada_ID == id_ciudad_llegada;
    });

    $("#transport_container #frmTransportes .ui.items").empty();
    $("#transport_container #frmVuelos .ui.items").empty();
    $("#transport_container #frmPortuarios .ui.items").empty();

    //terrestres
    if (!transports.filter(item => item.tipo_Transporte_ID == 2).length > 0) {
        $("#transport_container #frmTransportes .ui.items").append(
            `<div class="item">
                <div class="content">
                    <div class="ui negative message">
                        <div class="header">
                            No hay Transportes urbanos disponibles para esta area
                        </div>
                    </div>
                </div>
            </div>`
        );
    }
    //aereos
    if (!transports.filter(item => item.tipo_Transporte_ID == 4).length > 0) {
        $("#transport_container #frmVuelos .ui.items").append(
            `<div class="item">
                <div class="content">
                    <div class="ui negative message">
                        <div class="header">
                             No hay vuelos disponibles para esta area
                        </div>
                    </div>
                </div>
            </div>`
        );
    }
    //acuaticos
    if (!transports.filter(item => item.tipo_Transporte_ID == 1).length > 0) {
        $("#transport_container #frmPortuarios .ui.items").append(
            `<div class="item">
                <div class="content">
                    <div class="ui negative message">
                        <div class="header">
                            No hay servicios de transportes maritimos disponibles para esta area
                        </div>
                    </div>
                </div>
            </div>`
        );
    }

    if (transports.length > 0) {

        for (var i = 0; i < transports.length; i++) {

            const element = transports[i];
            const images = element.image_URL.split(",");

            const ciudadSalida = CitiesList.data.filter(item => item.id == id_ciudad_salida)[0];
            const ciudadDestino = CitiesList.data.filter(item => item.id == id_ciudad_llegada)[0];
            const hora_salida =
                element.hora_Salida.split(":")[0] > 12
                    ? element.hora_Salida + " PM"
                    : element.hora_Salida + " AM"

            const card =
                `<div class="item transport_item" data-value="${element.id}">
                    <div class="image">
                        <img src="${urlAPI}/Images/${images[0]}">
                    </div>
                    <div class="content" style="width: inherit;">
                        <a class="header">${element.parter}</a>
                        <div class="description">
                            <h4 class="ui blue header">
                                <i class="calendar check icon"></i>
                                Hora de salida: ${hora_salida}
                            </h4>
                        </div>
                        <div class="extra">
                            <div class="ui label">
                                <i class="map marker icon"></i> ${ciudadSalida.pais}, ${ciudadSalida.ciudad}
                            </div>
                            <div class="ui label">
                                <i class="map marker alternate icon"></i> ${ciudadDestino.pais}, ${ciudadDestino.ciudad}
                            </div>
                            <h3 class="ui green header">L ${parseFloat(element.precio).toFixed(2)} por asiento</h3>
                        </div>
                    </div>
                    <div class="content left floated transport_form_content">
                        <br>
                        <div class="fields">
                            <div class="field">
                                <label>No. de personas</label>
                                <div class="ui right labeled input transport_contador">
                                    <div class="ui icon button label minus_button">
                                        <i class="minus icon"></i>
                                    </div>
                                    <input class="count_input" type="number" value="1"
                                            style="text-align: center;" readonly>
                                    <div class="ui icon button label plus_button">
                                        <i class="plus icon"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="field required">
                                <label>Fecha reservacion</label>
                                <div class="ui calendar transport_fecha">
                                    <div class="ui input left icon">
                                        <i class="calendar icon"></i>
                                        <input type="text" placeholder="Fecha de reservacion" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br>
                        <button class="ui right floated primary button transport_trigger_button"
                                data-selected="false" data-value="${element.id}">
                            RESERVAR
                            <i class="right chevron icon"></i>
                        </button>
                    </div>
                </div>`;

            switch (element.tipo_Transporte_ID) {
                case 1:
                    $("#transport_container #frmPortuarios .ui.items").append(card);
                    break;
                case 2:
                    $("#transport_container #frmTransportes .ui.items").append(card);
                    break;
                case 4:
                    $("#transport_container #frmVuelos .ui.items").append(card);
                    break;
            }

        }

        $("button.transport_trigger_button").click(function (_this) {

            const selected = $(_this.target).attr("data-selected");
            //set default
            $("button.transport_trigger_button").addClass("primary").removeClass("positive");
            $("button.transport_trigger_button").attr("data-selected", "false");
            $("button.transport_trigger_button").html('RESERVAR <i class="right chevron icon"></i>');

            if (selected == "true") {

                $(_this.target).attr("data-selected", "false");
                $(_this.target).addClass("primary").removeClass("positive");
                $(_this.target).html('RESERVAR <i class="right chevron icon"></i>');
            } else {

                $(_this.target).attr("data-selected", "true");
                $(_this.target).removeClass("primary").addClass("positive");
                $(_this.target).html('RESERVADO <i class="right chevron icon"></i>');
            }
        });
        $('.transport_fecha').calendar({
            type: 'date',
            popupOptions: {
                position: 'bottom right',
                lastResort: 'bottom right',
                hideOnScroll: false
            }
        });
        createContador($(".transport_contador"));
    }
}

function fillRestaurant(id_ciudad) {

    if (RestaurantsList.code == 200) {
        const restaurant = jQuery.grep(RestaurantsList.data, function (item,i) {
            return item.ciudadID == id_ciudad;
        });

        $("#restaurant_container .ui.items").empty();
        if (restaurant.length > 0) {

            for (var i = 0; i < restaurant.length; i++) {

                const element = restaurant[i];
                const images = element.image_URL.split(",");
                const ciudad = CitiesList.data.filter(item => item.id == id_ciudad)[0];
                //carousel construct
                var carousel =
                    `<div class="fotorama restaurants_fotorama" data-allowfullscreen="true" data-nav="thumbs">`;
                for (var j = 0; j < images.length; j++) {
                    carousel += `<img src="${images[j]}">`;
                }
                carousel += "</div>";

                const card =
                    `<div class="item restaurant_item" data-value="${element.id}">
                        <div class="image">
                           ${carousel}
                        </div>
                        <div class="content" style="width: inherit;">
                            <h3>
                                <b class="blue_text">${element.restaurante}</b>
                            </h3>
                            <div class="extra">
                                <div class="ui label">
                                    <i class="map marker icon"></i> ${ciudad.pais}, ${ciudad.ciudad}
                                </div>
                                <br>
                                <button class="ui primary button menu_trigger_button" data-value="${element.id}">
                                    VER MENU
                                    <i class="right chevron icon"></i>
                                </button>
                            </div>
                        </div>
                        <div class="content left floated restaurant_form_content">
                            <br>
                            <div class="fields">
                                <div class="field required">
                                    <label>Fecha reservacion</label>
                                    <div class="ui calendar restaurant_fecha">
                                        <div class="ui input left icon">
                                            <i class="calendar icon"></i>
                                            <input type="text" placeholder="Fecha de reservacion" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br>
                            <button class="ui right floated primary button restaurant_trigger_button"
                                 data-selected="false" data-value="${element.id}">
                                RESERVAR
                                <i class="right chevron icon"></i>
                            </button>
                        </div>
                    </div>`;

                $("#restaurant_container .ui.items").append(card);
            }

            $("button.restaurant_trigger_button").click(function (_this) {

                const selected = $(_this.target).attr("data-selected");

                //set default
                $("button.restaurant_trigger_button").addClass("primary").removeClass("positive");
                $("button.restaurant_trigger_button").attr("data-selected", "false");
                $("button.restaurant_trigger_button").html('RESERVAR <i class="right chevron icon"></i>');

                if (selected == "true") {

                    $(_this.target).attr("data-selected", "false");
                    $(_this.target).addClass("primary").removeClass("positive");
                    $(_this.target).html('RESERVAR <i class="right chevron icon"></i>');
                }
                else {

                    $(_this.target).attr("data-selected", "true");
                    $(_this.target).removeClass("primary").addClass("positive");
                    $(_this.target).html('RESERVADO <i class="right chevron icon"></i>');
                }

            });
            $("button.menu_trigger_button").click(function (_this) {

                var id_restaurante = $(_this).attr("data-value");
                fillMenu(id_restaurante);
                $("#mdlMenus").modal("show");
            });
            $('.restaurant_fecha').calendar({
                popupOptions: {
                    position: 'bottom right',
                    lastResort: 'bottom right',
                    hideOnScroll: false
                }
            });
            $(".restaurants_fotorama").fotorama();
        }
        else {
            $("#restaurant_container .ui.items").append(
                `<div class="item">
                    <div class="content">
                        <div class="ui negative message">
                            <div class="header">
                                No hay restaurantes disponibles en esta zona
                            </div>
                        </div>
                    </div>
                </div>`
            );
        }
    }
}

function fillMenu(id_restaurante) {
    if (MenusList.code == 200) {
        const menus = jQuery.grep(MenusList.data, function (item, i) {
            return item.ciudadID == id_restaurante;
        });

        if (menus.length > 0) {

            $("#mdlMenus .ui.items").empty();
            for (var i = 0; i < menus.length; i++) {

                const element = menus[i];
                const images = element.image_Url.split(",");

                //carousel construct
                var carousel =
                    `<div class="fotorama menu_fotorama" data-allowfullscreen="true" data-nav="thumbs">`;
                for (var j = 0; j < images.length; j++) {
                    carousel += `<img src="${images[j]}">`;
                }
                carousel += "</div>";

                const card =
                    `<div class="item menu_item">
                        <div class="image">
                            ${carousel}
                        </div>
                        <div class="content" style="width: inherit;">
                            <a class="header">${element.menu}</a>
                            <div class="ui label"><i class="utensils icon"></i>${element.tipoMenu}</div>
                            <div class="description">
                                ${element.descripcion}
                            </div>
                            <div class="extra">
                                <h3 class="ui green header">L ${parseFloat(element.precio).toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>`;

                $("#mdlMenus .ui.items").append(card);
            }

            $(".menu_fotorama").fotorama();
        }
        else {
            $("#mdlMenus .ui.items").append(
                `<div class="item">
                    <div class="content">
                        <div class="ui negative message">
                            <div class="header">
                                No hay platillos o un menu disponibles de este restaurante
                            </div>
                        </div>
                    </div>
                </div>`
            );
        }
    }
}


//--------------------------------- GET DETAILS FUNCTIONS ------------------------------------------

function FinalizarCompra(reservationDetail) {
    console.log("function");
    console.log(reservationDetail);
    var command = FindGetValue("Command")
    var detailSuccess = true;
    var errorDiv =
        `<div class="ui error message">
            <div class="header">
                Algunos campos o aspectos son invalidos 
            </div>
            <ul class="list">`;

    if (command != "Update") {
        const cantidadDePagos = $("#txtCantidadPagos").val();
        const metodoPago = $("#cbbFormaPago").find(".item.selected").eq(0).attr("data-value");
        if (cantidadDePagos <= 0) {
            errorDiv += `<li>Campo requerido: Cantidad de pagos/cuotas</li>`;
            detailSuccess = false;
        } else if (cantidadDePagos > 5) {
            errorDiv += `<li>Excediste la cantidad maxima de pagos/cuotas (Cantidad maxima de pagos: 5)</li>`;
            detailSuccess = false;
        }

    
        if (metodoPago == undefined) {
            errorDiv += `<li>Seleccione una forma de pago</li>`;
            detailSuccess = false;
        }
    }
    

    $("#completarPagoError").empty();
    if (detailSuccess) {
        if (command != "Update") {
            reservationDetail.resv_CantidadPagos = parseInt(cantidadDePagos);
            reservationDetail.tipoPago = parseInt(metodoPago);
        }
        
        
        
        var response;

        if (command == "Update") {
            var UserID = FindGetValue("userID")
            if (UserID != null) {
                reservationDetail.usua_ID = parseInt(UserID);
            }
        } else {
            var UserID = FindGetValue("responseID")
            if (UserID != null) {
                reservationDetail.usua_ID = parseInt(UserID);
            }
        }
        
        if (command == "Update") {
            var resvID = FindGetValue("responseID")
            console.log( JSON.stringify(reservationDetail));
            response = ajaxRequest(urlAPI + "/API/Reservation/Update?id="+resvID, reservationDetail, "PUT");
        } else {
            response = ajaxRequest(urlAPI +"/API/Reservation/Insert", reservationDetail, "POST");
        }
        

        if (response.data.codeStatus > 0) {
            steps.success(true);
            var id = response.data.codeStatus;
            if (command == "Reservation" || command == "Update") {
                $("#btnVolver").on("click", function () {
                    redirection(id);
                });
                $("#btnCrearOtro").on("click", function () {
                    redirection(id);
                });
            }
            
        } else {
            console.log(reservationDetail);
            steps.success(false);
        }
    }
    else {
        errorDiv += `</ul></div>`;
        $("#completarPagoError").append(errorDiv);
    }
}

function redirection(id) {
    location.href = "/Reservation/Index?isSuccess=true&Command=Personalize&responseID="+id
}

function getReservationDetail() {

    var detailSuccess = true;

    var errorDiv =
        `<div class="ui error message">
            <div class="header">
                Hay algunos campos o aspectos incompletos 
            </div>
            <ul class="list">`;

    const reservationDetail = ReservationCreateViewModel.reservacion;
    reservationDetail.resv_NumeroPersonas = parseInt($("#txtCantidadPersonas").val());
    reservationDetail.reHo_FechaEntrada = 
        $("#txtFechaEntrada input[type='text']").val() == 0
            ? 0
            : new Date($("#txtFechaEntrada input[type='text']").val()).toISOString();
    reservationDetail.reHo_FechaSalida =
        $("#txtFechaSalida input[type='text']").val() == 0
            ? 0 
            : new Date($("#txtFechaSalida input[type='text']").val()).toISOString();
    reservationDetail.hote_ID = parseInt($("button.hotel_button_trigger[data-selected='true']").eq(0).attr("data-value"));

    const activities = ReservationDetail.getActivities();
    const restaurant = ReservationDetail.getRestaurant();
    const rooms = ReservationDetail.getRooms();
    const transports = ReservationDetail.getTransport();

    if (!activities.success) {
        errorDiv += `<li>${activities.message}</li>`;
        detailSuccess = false;
    }

    if (!restaurant.success) {
        errorDiv += `<li>${restaurant.message}</li>`;
        detailSuccess = false;
    }

    if (!rooms.success) {
        errorDiv += `<li>${rooms.message}</li>`;
        detailSuccess = false;
    }

    if (!transports.success) {
        errorDiv += `<li>${transports.message}</li>`;
        detailSuccess = false;
    }

    if ($("#txtFechaEntrada input[type='text']").val() == 0 ) {
        errorDiv += `<li>ingresa una fecha de entrada</li>`;
        detailSuccess = false;
    }

    if ($("#txtFechaSalida input[type='text']").val() == 0) {
        errorDiv += `<li>ingresa una fecha de salida</li>`;
        detailSuccess = false;
    }

    reservationDetail.restaurantes = restaurant.data;
    reservationDetail.actividadesExtras = activities.extra;
    reservationDetail.actividadesHoteles = activities.hotel;
    reservationDetail.resv_Habitaciones = rooms.data;
    reservationDetail.reservacionTransportes = transports.data;

    errorDiv += `</ul></div>`;

    if (detailSuccess) {
        $("#pago_container #frmError").hide();
        $("#pago_container #frmDetails").show();
        getReservationDetail_html.main(reservationDetail);
    } else {
        $("#pago_container #frmError").show();
        $("#pago_container #frmDetails").hide();

        $("#pago_container #frmError").empty();
        $("#pago_container #frmError").append(errorDiv);
    }
}

const getReservationDetail_html = {

    main: function (reservationDetail) {
        console.log("getReservationDetail_html");
        const hotelTotal = parseFloat(this.getHotels(reservationDetail));
        const transportTotal = this.getTransport(reservationDetail);
        const extraActivitiestTotal = this.getActivities(reservationDetail);
        this.getRestarant(reservationDetail);
        reservationDetail.resv_Precio = parseFloat(hotelTotal + transportTotal + extraActivitiestTotal);

        $("#details_Breakdown").find("tbody tr").eq(0).find("td").eq(1).find("h4.header").html(
            "L " + (hotelTotal + transportTotal + extraActivitiestTotal)
        );

        $("#details_Breakdown").find("tbody tr").eq(3).find("td").eq(1).find("h3.header").html(
            "L " + (hotelTotal + transportTotal + extraActivitiestTotal)
        );

        $("#btnFinalizar").off('click');
        $("#btnFinalizar").on('click',function () {
            console.log("click");
            FinalizarCompra(reservationDetail);
        });
        $('.ui.accordion').accordion();
    },

    getHotels: function (reservationDetail) {

        $("#frmDetails #frmDetails_hotel .ui.items").empty();
        const hotel = HotelsList.data.filter(x => x.id = reservationDetail.hote_ID)[0];
        const direccion = CitiesList.data.filter(x => x.id = hotel.ciudadID)[0];
        const days = getDaysBetweenTwoDates(reservationDetail.reHo_FechaEntrada, reservationDetail.reHo_FechaSalida);
        const images = hotel.image_URL.split(",");

        var habitaciones = 0;
        reservationDetail.resv_Habitaciones.forEach(element => habitaciones += parseInt(element.habi_Cantidad));

        // caroulse contruct
        var carousel = `<div class="fotorama hotels_fotorama" data-allowfullscreen="true" data-nav="thumbs" data-width="100%">`;
        for (var j = 0; j < images.length; j++) {
            carousel += `<img src="${images[j]}">`;
        }
        carousel += "</div>";

        // hotel details
        const rooms_detail = this.getRooms(reservationDetail);
        const activities_detail = this.getHotelActivities(reservationDetail);

        const subtotal = (parseFloat(activities_detail.subtotal) + (rooms_detail.subtotal * days)).toFixed(2);

        var card =
            `<div class="item">
                <div class="image">
                    ${carousel}
                </div>
                <div class="content style="width: inherit;">
                    <h3><b>${hotel.hotel}</b></h3>
                    <h5 class="blue_text">
                        <i class="map marker alternate blue icon"></i>
                        <b>${direccion.ciudad}, ${direccion.pais}</b>
                    </h5>

                    <div class="ui styled accordion">
                        <div class="title">
                            <i class="dropdown icon"></i>
                            Ver detalles
                        </div>
                        <div class="content accordion_details">
                            <h5 style="font-weight:bold;">- ${$("#txtCantidadPersonas").val()} Personas estimadas</h5>
                            <h5 style="font-weight:bold;">- ${days} Dias de hospedaje estimados</h5>
                            <h5 style="font-weight:bold;">- ${habitaciones} Habitaciones reservadas</h5>
                            <h5 style="font-weight:bold;">- ${reservationDetail.actividadesHoteles.length} Actividades reservadas</h5>
                        </div>

                        <div class="title">
                            <i class="dropdown icon"></i>
                            Ver habitaciones
                        </div>
                        <div class="content" id="accordion_rooms">
                            <div class="ui divided items">${rooms_detail.HTML_cards}</div>
                        </div>

                        <div class="title">
                            <i class="dropdown icon"></i>
                            Ver Actividades
                        </div>
                        <div class="content" id="accordion_activities">
                              <div class="ui divided items">${activities_detail.HTML_cards}</div>
                        </div>

                    </div>

                </div>
               <div class="content" style="display: flex;flex-direction: row-reverse;">
                    <table class="ui very basic collapsing table">
                        <tbody>
                            <tr>
                                <td style="text-align: end;">
                                    <h4 class="ui grey header">HABITACIONES</h4>
                                </td>
                                <td>
                                    <h4 class="ui black header">L ${(rooms_detail.subtotal * days).toFixed(2)}</h4>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: end;">
                                    <h4 class="ui grey header">
                                        ACTIVIDADES
                                    </h4>
                                </td>
                                <td>
                                    <h4 class="ui black header">
                                        L ${activities_detail.subtotal}
                                    </h4>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: end;">
                                    <h3 class="ui image header">
                                        <b>SUB TOTAL</b>
                                    </h3>
                                </td>
                                <td>
                                    <h3 class="ui green header">
                                        L ${subtotal}
                                    </h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>`;
        

        $("#frmDetails #frmDetails_hotel .ui.items").append(card);

        return subtotal;
    },

    getRooms: function (reservationDetail) {

        var response = {
            subtotal : 0,
            HTML_cards : ""
        }

        $.each(reservationDetail.resv_Habitaciones, function (i, item) {

            const room = RoomsList.data.filter(x => x.id == item.habi_ID)[0];
            response.subtotal += parseFloat(room.precio).toFixed(2) * item.habi_Cantidad;

            const images = room.imageUrl.split(",");
            response.HTML_cards +=
                `<div class="item">
                    <div class="image">
                        <img src="${images[0]}">
                    </div>
                    <div class="content">
                        <h2 class="header">${room.habitacion} <div class="ui large label">${room.categoria}</div></h2><br>
                        <h3 class="ui header">- Para ${room.capacidad} personas</h3><br>
                        <h3 class="ui header">- Habitaciones reservadas: ${item.habi_Cantidad}</h3><br>
                        <h3 class="ui green header">L ${parseFloat(room.precio).toFixed(2)} por dia/noche</h3><br>
                    </div>
                </div>`;
        });

        response.subtotal = response.subtotal.toFixed(2);
        return response;
    },

    getHotelActivities: function (reservationDetail) {

        var response = {
            subtotal: 0,
            HTML_cards: ""
        }

        $.each(reservationDetail.actividadesHoteles, function (i, item) {

            const activity = HotelsActivitiesList.data.filter(x => x.id == item.hoAc_ID)[0];
            response.subtotal += parseFloat(item.reAH_Precio).toFixed(2) * item.reAH_Cantidad;

            const images = activity.image_URL.split(",");
            const fecha = GetDateFormat({ string_date: item.reAH_FechaReservacion, hour_format: 12, date_format: "large" });

            response.HTML_cards +=
                `<div class="item">
                    <div class="image">
                        <img src="${images[0]}">
                    </div>
                    <div class="content">
                        <h2 class="header">${activity.actividad}</h2><br>
                        <div class="description">
                            - Reservada para el dia ${fecha.datetime} <br>
                            - Reservada para ${item.reAH_Cantidad} personas
                        </div>
                         <h3 class="ui green header">L ${parseFloat(item.reAH_Precio).toFixed(2)} por persona</h3><br>
                    </div>
                </div>`;
        });

        response.subtotal = response.subtotal.toFixed(2);
        return response;
    },

    getTransport: function (reservationDetail) {

        var subtotal = 0;
        $("#frmDetails #frmDetails_transport").hide();
        if (reservationDetail.reservacionTransportes.length > 0) {

            $("#frmDetails #frmDetails_transport").show();
            $("#frmDetails #frmDetails_transport .ui.items").empty();

            $.each(reservationDetail.reservacionTransportes, function (i, item) {

                const transport = DetailsTransportationList.data.filter(x => x.id == item.detr_ID)[0];
                const Cities = ajaxRequest(urlAPI +"/API/Cities/List");
                const ciudadSalida = Cities.data.filter(x => x.id == transport.ciudad_Salida_ID)[0];
                const ciudadDestino = Cities.data.filter(x => x.id == transport.ciudad_Llegada_ID)[0];

                const images = transport.image_URL.split(",");
                const fecha = GetDateFormat({ string_date: item.reTr_FechaCancelado, hour_format: 12, date_format: "large" });
                subtotal += parseFloat(transport.precio) * parseInt(item.reTr_CantidadAsientos);

                const card =
                    `<div class="item">
                        <div class="image">
                            <img src="${urlAPI }/Images/${images[0]}">
                        </div>
                        <div class="content" style="width: inherit;">
                            <a class="header">${transport.parter}</a>
                            <div class="description">
                                <b class="ui blue header">- Reservado para el dia ${fecha.datetime}</b><br>
                                <b class="ui header">- ${item.reTr_CantidadAsientos} asientos reservados</b>
                            </div>
                            <div class="extra">
                                <div class="ui label"><i class="map marker icon"></i> ${ciudadSalida.pais}, ${ciudadSalida.ciudad}</div>
                                <div class="ui label"><i class="map marker alternate icon"></i>${ciudadDestino.pais}, ${ciudadDestino.ciudad}</div>
                                <h3 class="ui green header">L ${parseFloat(transport.precio).toFixed(2)} por asiento</h3>
                                <h2 class="ui header" style="text-align: end;">
                                    SUB TOTAL: <b style="color:green">L ${(parseFloat(transport.precio).toFixed(2) * item.reTr_CantidadAsientos).toFixed(2)}</b>
                                </h2>
                            </div>
                        </div>
                    </div>`;

                $("#frmDetails #frmDetails_transport .ui.items").append(card);
            });
        }

        return subtotal;
    },

    getActivities: function (reservationDetail) {

        var total = 0;
        $("#frmDetails #frmDetails_activities").hide();
        if (reservationDetail.actividadesExtras.length > 0) {

            $("#frmDetails #frmDetails_activities").show();
            $("#frmDetails #frmDetails_activities .ui.items").empty();

            $.each(reservationDetail.actividadesExtras, function (i, item) {

                const activity = ActivitiesExtraList.data.filter(x => x.id == item.acEx_ID)[0];

                const images = activity.imageURL.split(",");
                const fecha = GetDateFormat({ string_date: item.reAE_FechaReservacion, hour_format: 12, date_format: "large" });
                var subtotal = parseFloat(item.reAE_Precio) * item.reAE_Cantidad;

                total += subtotal;

                const card =
                    `<div class="item">
                        <div class="image">
                            <img src="${images[0]}">
                        </div>
                        <div class="content" style="width: inherit;">
                            <a class="header">${activity.actividad}</a>
                            <div class="description">
                                <b class="ui blue header">- Reservado para el dia ${fecha.datetime}</b><br>
                                <b class="ui header">- Reservado para ${item.reAE_Cantidad} personas</b>
                            </div>
                            <div class="extra">
                                <h3 class="ui green header">L ${parseFloat(activity.precio).toFixed(2)} por persona</h3>
                                <h2 class="ui header" style="text-align: end;">
                                    SUB TOTAL: <b style="color:green">L ${subtotal.toFixed(2)}</b>
                                </h2>
                            </div>
                        </div>
                    </div>`;

                $("#frmDetails #frmDetails_activities .ui.items").append(card);
            });
        }

        return total;
    },

    getRestarant: function (reservationDetail) {

        $("#frmDetails #frmDetails_Restaurant").hide();
        if (reservationDetail.restaurantes.length > 0) {

            $("#frmDetails #frmDetails_Restaurant").show();
            $("#frmDetails #frmDetails_Restaurant .ui.items").empty();

            $.each(reservationDetail.restaurantes, function (i, item) {

                const restaurant = RestaurantsList.data.filter(x => x.id == item.rest_ID)[0];

                const images = restaurant.image_URL.split(",");
                const fecha = GetDateFormat({ string_date: item.reRe_FechaReservacion, hour_format: 12, date_format: "large" });

                const card =
                    `<div class="item">
                        <div class="image">
                            <img src="${images[0]}">
                        </div>
                        <div class="content" style="width: inherit;">
                            <a class="header">${restaurant.restaurante}</a>
                            <div class="description">
                                <b class="ui blue header">- Reservado para el dia ${fecha.datetime}</b><br>
                                <b class="ui header">- Reservado para ${reservationDetail.resv_NumeroPersonas} personas</b>
                            </div>
                        </div>
                    </div>`;

                $("#frmDetails #frmDetails_Restaurant .ui.items").append(card);
            });
        }
    },
}

var ReservationDetail = {

    getRestaurant: function () {
        var response = {
            success: true,
            message: "",
            data: []
        };

        var contador_vacios = 0;
        // get current selected restaurant
        const restaurants = $("button.restaurant_trigger_button[data-selected='true']");

        $.each(restaurants, function (i, item) {

            const restaurantViewModel = {};

            // get data
            const stringDate = $(item).parents(".restaurant_form_content").eq(0).find(".restaurant_fecha input").val();

            if (stringDate == 0) {
                contador_vacios++;
            } else {
                const formatDate = stringDate == 0 ? 0 : new Date(stringDate).toISOString();

                // set restaurant data 
                restaurantViewModel.rest_ID = parseInt($(item).attr("data-value"));
                restaurantViewModel.reRe_FechaReservacion = formatDate;
                restaurantViewModel.reRe_HoraReservacion = formatDate.split("T")[1];

                // set response
                response.data.push(restaurantViewModel);
            }
        });

        if (contador_vacios > 0) {
            response.success = false;
            response.message = `No se ah especificado la fecha de reservacion de el restaurante seleccionado`;
        }
        return response;
    },

    getActivities: function () {

        var response = {
            success: true,
            message: "",
            contador: 0,
            hotel: [],
            extra: []
        };

        var contador_vacios = 0;
        const extraActivities = $("button.activity_trigger_button[data-selected='true']");
        const HotelActivities = $("button.activityHotel_trigger_button[data-selected='true']");

        //extra activities
        $.each(extraActivities, function (i, item) {

            // get data
            const extraActivity = {};
            const form_data = $(item).parents(".activitiesExtra_form_content").eq(0);

            // get date
            const stringDate = $(form_data).find(".activities_fecha input").val();
            if (stringDate == "" || stringDate == undefined) {
                contador_vacios++;
            } else {
                const formatDate = stringDate == 0 ? 0 : new Date(stringDate).toISOString();

                // set data
                extraActivity.acEx_ID = parseInt($(item).attr("data-value"));
                extraActivity.reAE_FechaReservacion = formatDate;
                extraActivity.reAE_HoraReservacion = formatDate.split("T")[1];
                extraActivity.reAE_Cantidad = parseInt($(form_data).find(".ExtraActivity_contador input[type='number']").val());
                extraActivity.reAE_Precio = ActivitiesExtraList.data.filter(n => n.id == extraActivity.acEx_ID)[0].precio;

                response.extra.push(extraActivity);
            }
        });

        //hotel activities
        $.each(HotelActivities, function (i, item) {

            // get data
            const HotelActivity = {};
            const form_data = $(item).parents(".hotelActivity_form_data").eq(0);

            // get date
            const stringDate = $(form_data).find(".activitiesHotels_fecha input").val();
            if (stringDate == "" || stringDate == undefined) {
                contador_vacios++;
            } else {
                const formatDate = stringDate == 0 ? 0 : new Date(stringDate).toISOString();

                // set data
                HotelActivity.hoAc_ID = parseInt($(item).attr("data-value"));
                HotelActivity.reAH_FechaReservacion = formatDate;
                HotelActivity.reAH_HoraReservacion = formatDate.split("T")[1];
                HotelActivity.reAH_Cantidad = parseInt($(form_data).find(".hotelActivity_contador input[type='number']").val());
                HotelActivity.reAH_Precio = HotelsActivitiesList.data.filter(x => x.id == HotelActivity.hoAc_ID)[0].precio;

                response.hotel.push(HotelActivity);
            }
        });
         
        if (contador_vacios > 0) {
            response.success = false;
            response.contador = contador_vacios;
            response.message = `No se ah especificado la fecha de reservacion de ${contador_vacios} actividades seleccionadas`;
        }
        return response;
    },

    getRooms: function () {

        var response = {
            success: true,
            message: "",
            data: [],
        };

        const rooms = $("#hotel_container #frmRooms .room_item");

        $.each(rooms, function (i, item) {

            const cantidad = parseInt($(item).find(".room_contador input[type='number']").val());

            if (cantidad > 0) {
                var model = {};
                model.habi_ID = parseInt($(item).attr("data-value"));
                model.habi_Cantidad = cantidad;
                response.data.push(model);
            }

        });
        if (response.data.length <= 0) {
            response.success = false;
            response.message = "Tienes que especificar al menos una habitacion de hospedaje.";
        }

        //console.log(response.data);
        return response;

    },

    getTransport: function () {

        var response = {
            success: true,
            message: "",
            data: [],
        };

        var contador_vacios = 0;
        var transports = $(".transport_trigger_button[data-selected='true']");

        $.each(transports, function (i,item) {
            // get data
            const model = {};
            const form_data = $(item).parents(".transport_form_content").eq(0);
            var transport = DetailsTransportationList.data.filter(x => x.id == parseInt($(item).attr("data-value")))[0];
            // get date
            const stringDate = $(form_data).find(".transport_fecha input").val();
            const formatDate = stringDate == 0 ? 0 : new Date(stringDate).toISOString();
            if (stringDate == "" || stringDate == undefined) {
                contador_vacios++;
            } else {
                model.detr_ID = parseInt($(item).attr("data-value"));
                model.reTr_CantidadAsientos = parseInt($(form_data).find(".transport_contador input[type='number']").val());
                model.reTr_FechaCancelado = `${formatDate.split("T")[0]}T${transport.hora_Salida}`;

                response.data.push(model);
            }
        });

        if (contador_vacios > 0) {
            response.success = false;
            response.contador = contador_vacios;
            response.message = `No se ah especificado la fecha de reservacion de el transporte seleccionado`;
        }
        return response;
    }
}